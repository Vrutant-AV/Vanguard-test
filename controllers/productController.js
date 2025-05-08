const { Product } = require('../models');

exports.createProduct = async (req, res) => {
    try {
        const { title, slug, description, price, category, stock, is_featured } = req.body;

        const newProduct = await Product.create({
            title, 
            slug,
            description,
            price,
            category,
            stock,
            is_featured
        });

        res.status(201).json({ message: 'Product created successfully', product:newProduct });
    }   catch(err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Faileed to create product', error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.findAll();
        res.json(products);
    }   catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

  
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.update(updates);
        res.json({ message: 'Product updated successfully', product });
    }   catch (err) {
        res.status(500).json({ message: 'Failed to update product', error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    }   catch (err) {
        res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
};