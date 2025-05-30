const { Product, ProductImage } = require('../models');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { 
                    model: ProductImage, 
                    as: 'images',
                    attributes: ['image_url'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) { 
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load products.',
        });
    }
};