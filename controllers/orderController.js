const { Order, OrderItem, Product } = require('../models');

exports.createOrder = async(req, res) => {
    try{
        const { products, total_price, shipping_address } = req.body;
        const userId = req.user.id;

        const newOrder = await Order.create({ 
            userId,
            total_price,
            shipping_address,
        });

        const orderItems = await Promise.all(products.map(async (product) => {
            return await OrderItem.create({
                order_id: newOrder.id,
                product_id: product.product_id,
                quantity: product.quantity,
                unit_price: product.unit_price,
            });
        }));

        res.status(201).json({ message: 'Order places successfully', newOrder, orderItems });
    }   catch (error) {
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

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',  // Corrected alias here
                    include: [
                        {
                            model: Product,
                            as: 'product',  // Ensure this matches your model definition
                        },
                    ],
                },
            ],
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Failed to fetch user orders', error: error.message });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try{
        const { status } = req.body;
        const orderId = req.params.id;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        await order.save();

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