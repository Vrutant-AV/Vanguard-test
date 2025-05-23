const { Order, Product, User } = require('../models');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalProducts = await Product.count();
        const totalOrders = await Order.count();
        const totalRevenue = await Order.sum('total_price');

        res.status(200).json({
            success:true,
            data: { 
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue: totalRevenue || 0,
            },
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard stats.',
        });
    }
};