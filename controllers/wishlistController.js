const { Wishlist, Product } = require('../models');

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id } = req.body;

        const product = await Product.findByPk(product_id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const exists = await Wishlist.findOne({ where: { user_id: userId, product_id } });
        if (exists) return res.status(400).json({ message: 'Product already in wishlist' });

        const entry = await Wishlist.create({ user_id: userId, product_id });
        res.status(201).json({ message: 'Added to wishlist', wishlist: entry });
    } catch (err) {
        console.error('Add to wishlist error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all items in the wishlist
exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const wishlist = await Wishlist.findAll({
            where: { user_id: userId },
            include: [{
                model: Product, 
                as: 'product' 
            }],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({ wishlist });
    } catch (err) {
        console.error('Get wishlist error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const deleted = await Wishlist.destroy({
            where: { user_id: userId, product_id: productId }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Item not found in wishlist' });
        }

        res.status(200).json({ message: 'Removed from wishlist' });
    } catch (err) {
        console.error('Remove wishlist error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};