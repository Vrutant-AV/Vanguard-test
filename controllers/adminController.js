const { Order, User, Product, sequelize } = require('../models');
const { Op } = require('sequelize');

// check's the order status
exports.getOrderStatistics = async (req, res) => {
    try {
        const totalOrders = await Order.count();
        const revenue = await Order.sum('total_price');
        const statusCounts = await Order.findAll({
            attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
            group: ['status'],
        });

        res.json({ totalOrders, revenue, statusCounts });
    } catch (error) {
        console.error('Error fetching order statistics:', error);
        res.status(500).json({ message: 'Failed to fetch order statistics' });
    }
};

// get the product insights for low stock and top selling products
exports.getProductInsights = async (req, res) => {
    try {
        const lowStockProducts = await Product.findAll({
            where: { stock: {[Op.lt]: 10 } },
            attributes: ['id', 'title', 'stock'],
        });

        const topSellingProducts = await Product.findAll({
            order: [['stock', 'DESC']],
            limit: 5,
            attributes: ['id', 'title', 'stock'],
        });

        res.json({ lowStockProducts, topSellingProducts });
        
    } catch (error) {
        console.error('Error fetching product insights:', error);
        res.status(500).json({ message: 'Failed to fetch product insights' });
    }
};

// recent activity (History)
exports.getRecentActivity = async (req, res) => {
    try {
        const recentOrders = await Order.findAll({
            order: [['created_at', 'DESC']],
            limit: 5,
        });

        const recentUsers = await User.findAll({
            order: [['created_at', 'DESC']],
            limit: 5,
        });

        res.json({ recentOrders, recentUsers });
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        res.status(500).json({ message: 'Failed to fetch recent activity' });
    }
};

// Update product stock
exports.updateProductStock = async (req, res) => {
    try {
      const { productId, newStock } = req.body;
  
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      product.stock = newStock;
      await product.save();
  
      res.status(200).json({ message: 'Product stock updated successfully' });
    } catch (error) {
      console.error('Error updating product stock:', error);
      res.status(500).json({ message: 'Stock update failed', error });
    }
};
  