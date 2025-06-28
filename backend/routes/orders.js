const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get user orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'product_name', p.name,
                 'product_image', p.images->0,
                 'quantity', oi.quantity,
                 'price', oi.price,
                 'size', oi.size,
                 'color', oi.color
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.user.id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'product_name', p.name,
                 'product_image', p.images->0,
                 'quantity', oi.quantity,
                 'price', oi.price,
                 'size', oi.size,
                 'color', oi.color
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1 AND o.user_id = $2
      GROUP BY o.id
    `, [id, req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create order
router.post('/', authenticateToken, [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.product_id').isInt({ min: 1 }).withMessage('Valid product ID required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('shipping_address').isObject().withMessage('Shipping address required'),
  body('shipping_address.street').trim().isLength({ min: 1 }).withMessage('Street address required'),
  body('shipping_address.city').trim().isLength({ min: 1 }).withMessage('City required'),
  body('shipping_address.state').trim().isLength({ min: 1 }).withMessage('State required'),
  body('shipping_address.postal_code').trim().isLength({ min: 1 }).withMessage('Postal code required'),
  body('shipping_address.country').trim().isLength({ min: 1 }).withMessage('Country required')
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

    const { items, shipping_address, billing_address } = req.body;

    // Calculate total
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
    }

    // Create order
    const orderResult = await client.query(`
      INSERT INTO orders (user_id, total_amount, status, shipping_address, billing_address)
      VALUES ($1, $2, 'pending', $3, $4)
      RETURNING *
    `, [req.user.id, total, JSON.stringify(shipping_address), JSON.stringify(billing_address || shipping_address)]);

    const order = orderResult.rows[0];

    // Create order items
    for (const item of items) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [order.id, item.product_id, item.quantity, item.price, item.size || null, item.color || null]);

      // Update product stock
      await client.query(`
        UPDATE products 
        SET stock_quantity = stock_quantity - $1
        WHERE id = $2
      `, [item.quantity, item.product_id]);
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Update order status (Admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(`
      UPDATE orders 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order: result.rows[0]
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all orders (Admin only)
router.get('/admin/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, u.name as customer_name, u.email as customer_email,
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'product_name', p.name,
                 'quantity', oi.quantity,
                 'price', oi.price,
                 'size', oi.size,
                 'color', oi.color
               )
             ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, u.name, u.email
      ORDER BY o.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;