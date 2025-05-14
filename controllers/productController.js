const { Product, ProductImage } = require('../models');
const s3 = require('../config/awsConfig');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

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

exports.uploadProductImage = async (req, res) => {
    try{
        const { productId } = req.params;
        const imageUrl = req.file.location;

        const newImage = await ProductImage.create({
            product_id: productId,
            image_url: imageUrl,
        });

        res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
    } catch (error) {
        console.error('Error uploading product image:', error);
        res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
};

exports.getProductImages = async (req, res) => {
    try { 
        const { productId } = req.params;

        const images = await ProductImage.findAll({ where: { product_id: productId } });

        if (!images.length) {
            return res.status(404).json({ message: 'No images found for this product' });
        }

        res.json({ message: 'Product images retrieved', images });
    } catch (error) {
        console.error('Error fetching product images:', error);
        res.status(500).json({ message: 'Failed to retrieve images', error: error.message });
    }
};

exports.updateProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const imageUrl = req.file.location;

        const image = await ProductImage.findByPk(imageId);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        const oldImageUrl = image.image_url;
        const key = oldImageUrl.split('.com/')[1];

        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            key: key,
        }).promise();

        image.image_url = imageUrl;
        await image.save();

        res.json({ message: 'Image updated successfully', image});
    } catch (error) {
        console.error('Error updating product image:', error);
        res.status(500).json({ message: 'Image update failed', error: error.message });
    }
};

exports.deleteProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const image = await ProductImage.findByPk(imageId);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        const key = image.image_url.split('.com/')[1];

        const command = new DeleteObjectCommand({ 
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:key,
        });
        
        await s3.send(command);
        await image.destroy();

        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting product image:', error);
        res.status(500).json({ message: 'Image deletion failed', error: error.message });
    }
};