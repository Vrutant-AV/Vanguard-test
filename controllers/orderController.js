const { Order, OrderItem, Product, ProductImage } = require('../models');

const sendNotification = (userId, message) => {
    console.log(`Notification send to User ${userId}: ${message}`);
};

exports.createOrder = async(req, res) => {
    try{
        const { products, total_price, shipping_address } = req.body;
        const userId = req.user.id;

        const newOrder = await Order.create({ 
            user_id: userId,
            total_price,
            shipping_address,
        });

        const orderItems = await Promise.all(products.map(async (product) => {
            const productRecord = await Product.findByPk(product.product_id);
            
            if (!productRecord || productRecord.stock < product.quantity) {
                throw new Error(`Insufficient stock for product ID: ${product.product_id}`);
            }
            
            productRecord.stock -= product.quantity;
            await productRecord.save();
            
            return await OrderItem.create({
                order_id: newOrder.id,
                product_id: product.product_id,
                quantity: product.quantity,
                unit_price: product.unit_price,
            });
        }));

        res.status(201).json({ message: 'Order places successfully', newOrder, orderItems });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message:'Failed to place order', error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try{
        const orders = await Order.findAll({
            include: [{
                model: OrderItem,
                as: 'items',
            }]
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

/*
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['title', 'price'],
                        },
                    ],
                },
            ],
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ message: 'User orders fetched successfully', orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Failed to fetch user orders', error: error.message });
    }
};
*/

exports.updateOrderStatus = async (req, res) => {
    try{
        const { status } = req.body;
        const orderId = req.params.id;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        order.status_updated_at = new Date();
        await order.save();

        sendNotification(order.user_id, `Your order #${orderId} status changed to ${status}.`);

        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try{
        const orderId = req.params.id;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        await order.destroy();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
};

exports.getUserOrderHistory = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const orders = await Order.findAll({
        where: { user_id: userId },
        include: [
          {
            model: OrderItem,
            as: 'items',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['title', 'price'],
                include: [
                    {
                        model: ProductImage,
                        as: 'images',
                        attributes: ['image_url'],
                    },
                ],
              },
            ],
          },
        ],
        order: [['created_at', 'DESC']],
      });
  
      if (!orders.length) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      res.status(200).json({ message: 'Order history retrieved successfully', orders });
    } catch (error) {
      console.error('Error fetching user order history:', error);
      res.status(500).json({ message: 'Failed to fetch order history', error: error.message });
    }
};

exports.getOrderTracking = async (req, res) => {
    try{
        const orderId = req.params.id;

        const order = await Order.findByPk(orderId, {
            include:[{
                model: OrderItem,
                as: 'items',
                include: [
                    {
                      model: Product,
                      as: 'product',
                      attributes: ['title', 'price'],
                      include: [{
                            model: ProductImage,
                            as: 'images',
                            attributes: ['image_url'],
                        },],
                    },
                ],
            }]
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order tracking information retrieved', order });
    } catch (error) {
        console.error('Error fetching order tracking:', error);
        res.status(500).json({ message: 'Failed to fetch order tracking', error: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { reason } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (['shipped', 'delivered'].includes(order.status)) {
            return res.status(400).json({ message: 'Cannot cancel a shipped or delivered order' });
        }

        order.status = 'cancelled';
        order.cancelled_reason = reason;
        order.cancelled_at = new Date();
        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Failed to cancel order', error: error.message });
    }
};

exports.requestReturn = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { reason } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is delivered before requesting a return
        if (order.status !== 'delivered') {
            return res.status(400).json({ message: 'Return can only be requested after delivery' });
        }

        order.return_requested = true;
        order.return_reason = reason;
        await order.save();

        res.status(200).json({ message: 'Return request submitted', order });
    } catch (error) {
        console.error('Error requesting return:', error);
        res.status(500).json({ message: 'Failed to request return', error: error.message });
    }
};

exports.handleReturn = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { approve } = req.body;

        const order = await Order.findByPk(orderId, { include: ['items'] });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (!order.return_requested) {
            return res.status(400).json({ message: 'No return request found for this order' });
        }

        if (approve) {
            for (const item of order.items) {
                const product = await Product.findByPk(item.product_id);
                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }

            order.return_approved = true;
            order.status = 'returned';
            order.return_at = new Date();
        } else {
            order.return_requested = false;
            order.return_reason = null;
        }

        await order.save();
        res.status(200).json({ message: approve ? 'Return approved' : 'Return rejected', order });
    } catch (error) {
        console.error('Error handling return:', error);
        res.status(500).json({ message: 'Failed to handle return', error: error.message });
    }
};

exports.approveReturn = async (req, res) => {
    try {
        const { return_status } = req.body;
        const orderId = req.params.id;

        if (!['approved', 'rejected'].includes(return_status)) {
            return res.status(400).json({ message: 'Invalid return status' });
        }

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.return_status = return_status;
        await order.save();

        res.json({ message: `Order return ${return_status} successfully`, order });
    } catch (error) {
        console.error('Error approving return:', error);
        res.status(500).json({ message: 'Failed to approve return', error: error.message });
    }
};