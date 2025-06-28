const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Simulate payment processing
const processPayment = async (paymentInfo, amount) => {
  // In a real application, this would integrate with a payment processor like Stripe
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate payment success/failure
      const success = Math.random() > 0.1; // 90% success rate for demo
      resolve({
        success,
        transactionId: success ? `txn_${Date.now()}` : null,
        message: success ? 'Payment processed successfully' : 'Payment failed'
      });
    }, 2000);
  });
};

// Process checkout
router.post('/', authenticateToken, [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.product_id').isInt({ min: 1 }).withMessage('Valid product ID required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('shipping_address').isObject().withMessage('Shipping address required'),
  body('shipping_address.name').trim().isLength({ min: 1 }).withMessage('Name required'),
  body('shipping_address.street').trim().isLength({ min: 1 }).withMessage('Street address required'),
  body('shipping_address.city').trim().isLength({ min: 1 }).withMessage('City required'),
  body('shipping_address.state').trim().isLength({ min: 1 }).withMessage('State required'),
  body('shipping_address.postal_code').trim().isLength({ min: 1 }).withMessage('Postal code required'),
  body('shipping_address.country').trim().isLength({ min: 1 }).withMessage('Country required'),
  body('payment_info').isObject().withMessage('Payment information required'),
  body('payment_info.cardNumber').trim().isLength({ min: 1 }).withMessage('Card number required'),
  body('payment_info.cardholderName').trim().isLength({ min: 1 }).withMessage('Cardholder name required'),
  body('total_amount').isFloat({ min: 0 }).withMessage('Total amount must be positive')
], async (req, res) => {
  const client = await pool.connect();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    await client.query('BEGIN');

    const { items, shipping_address, billing_address, payment_info, total_amount } = req.body;

    // Validate product availability and prices
    for (const item of items) {
      const productResult = await client.query(
        'SELECT id, name, price, stock_quantity FROM products WHERE id = $1 AND status = $2',
        [item.product_id, 'active']
      );

      if (productResult.rows.length === 0) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }

      const product = productResult.rows[0];

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      // Verify price hasn't changed
      if (Math.abs(product.price - item.price) > 0.01) {
        throw new Error(`Price has changed for product: ${product.name}`);
      }
    }

    // Calculate and verify total
    let calculatedTotal = 0;
    for (const item of items) {
      calculatedTotal += item.price * item.quantity;
    }

    // Add shipping (free over $100)
    const shipping = calculatedTotal > 100 ? 0 : 15;
    calculatedTotal += shipping;

    // Add tax (8%)
    const tax = calculatedTotal * 0.08;
    calculatedTotal += tax;

    if (Math.abs(calculatedTotal - total_amount) > 0.01) {
      throw new Error('Total amount mismatch');
    }

    // Process payment
    const paymentResult = await processPayment(payment_info, total_amount);
    
    if (!paymentResult.success) {
      throw new Error(paymentResult.message);
    }

    // Create order
    const orderResult = await client.query(`
      INSERT INTO orders (user_id, total_amount, status, shipping_address, billing_address, payment_transaction_id)
      VALUES ($1, $2, 'processing', $3, $4, $5)
      RETURNING *
    `, [
      req.user.id, 
      total_amount, 
      JSON.stringify(shipping_address), 
      JSON.stringify(billing_address || shipping_address),
      paymentResult.transactionId
    ]);

    const order = orderResult.rows[0];

    // Create order items and update stock
    for (const item of items) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [order.id, item.product_id, item.quantity, item.price, item.size || null, item.color || null]);

      // Update product stock
      await client.query(`
        UPDATE products 
        SET stock_quantity = stock_quantity - $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [item.quantity, item.product_id]);
    }

    await client.query('COMMIT');

    // Send order confirmation (in a real app, this would be an email)
    console.log(`Order confirmation for order #${order.id} sent to ${shipping_address.email}`);

    res.status(201).json({
      message: 'Order processed successfully',
      order: {
        id: order.id,
        total_amount: order.total_amount,
        status: order.status,
        created_at: order.created_at,
        transaction_id: paymentResult.transactionId
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Checkout error:', error);
    
    if (error.message.includes('not found') || 
        error.message.includes('Insufficient stock') || 
        error.message.includes('Price has changed') ||
        error.message.includes('Total amount mismatch')) {
      return res.status(400).json({ message: error.message });
    }

    if (error.message.includes('Payment failed')) {
      return res.status(402).json({ message: 'Payment processing failed. Please try again.' });
    }

    res.status(500).json({ message: 'Internal server error during checkout' });
  } finally {
    client.release();
  }
});

// Get checkout session (for retrieving cart items with updated prices)
router.get('/session', authenticateToken, async (req, res) => {
  try {
    const { items } = req.query;
    
    if (!items) {
      return res.status(400).json({ message: 'Items parameter required' });
    }

    const itemIds = JSON.parse(items);
    
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({ message: 'Invalid items format' });
    }

    // Get current product information
    const placeholders = itemIds.map((_, index) => `$${index + 1}`).join(',');
    const result = await pool.query(`
      SELECT id, name, price, stock_quantity, images
      FROM products 
      WHERE id IN (${placeholders}) AND status = 'active'
    `, itemIds);

    const products = result.rows;
    
    // Check for any missing products
    const foundIds = products.map(p => p.id);
    const missingIds = itemIds.filter(id => !foundIds.includes(id));
    
    if (missingIds.length > 0) {
      return res.status(400).json({ 
        message: 'Some products are no longer available',
        missing_products: missingIds
      });
    }

    res.json({
      products,
      shipping_threshold: 100,
      tax_rate: 0.08,
      shipping_cost: 15
    });

  } catch (error) {
    console.error('Get checkout session error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;