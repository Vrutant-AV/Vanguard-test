const { Product, ProductImage } = require('../models');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

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
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['image_url'],
                },
            ],
            order: [['id', 'ASC']], 
        });

        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
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

const generateFileHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(fileBuffer).digest('hex');
};

exports.uploadProductImage = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const hash = generateFileHash(filePath);
        const imageUrl = `/public/uploads/${hash}-${req.file.originalname}`;

        // Check for duplicate image
        const existingImage = await ProductImage.findOne({ where: { image_url: imageUrl } });
        if (existingImage) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ message: `Duplicate image: ${req.file.originalname}` });
        }

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

exports.uploadProductImages = async (req, res) => {
    try {
        const { productId } = req.params;
        const uploadedImages = [];

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        for (const file of req.files) {
            const filePath = file.path;
            const hash = generateFileHash(filePath);
            const imageUrl = `/public/uploads/${hash}-${file.originalname}`;

            try {
                const existingImage = await ProductImage.findOne({ where: { image_url: imageUrl } });
                if (existingImage) {
                    fs.unlinkSync(filePath);
                    console.log(`Duplicate image detected: ${file.originalname}`);
                    continue;
                }

                const newImage = await ProductImage.create({
                    product_id: productId,
                    image_url: imageUrl,
                });

                uploadedImages.push(newImage);
            } catch (err) {
                console.error(`Error processing image: ${file.originalname}`, err);
                fs.unlinkSync(filePath);
            }
        }

        if (uploadedImages.length === 0) {
            return res.status(400).json({ message: 'No valid images uploaded' });
        }

        res.status(201).json({ message: 'Images uploaded successfully', images: uploadedImages });
    } catch (error) {
        console.error('Error uploading product images:', error);
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

        res.status(200).json({ message: 'Product images retrieved successfully', images });
    } catch (error) {
        console.error('Error fetching product images:', error);
        res.status(500).json({ message: 'Failed to retrieve images', error: error.message });
    }
};

exports.updateProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = path.join(__dirname, '..', '..', 'public', 'uploads', req.file.filename);
        const hash = generateFileHash(filePath);
        const imageUrl = `/public/uploads/${hash}-${req.file.originalname}`;

        const existingImage = await ProductImage.findOne({ where: { image_url: imageUrl } });
        if (existingImage) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ message: `Duplicate image: ${req.file.originalname}` });
        }

        const image = await ProductImage.findByPk(imageId);
        if (!image) {
            fs.unlinkSync(filePath);
            return res.status(404).json({ message: 'Image not found' });
        }

        const oldFilePath = path.join(__dirname, '..', '..', image.image_url);
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }

        image.image_url = imageUrl;
        await image.save();

        res.status(200).json({ message: 'Image updated successfully', image });
    } catch (error) {
        console.error('Error updating product image:', error);
        res.status(500).json({ message: 'Image update failed', error: error.message });
    }
};

exports.deleteProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const image = await ProductImage.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const filePath = path.join(__dirname, '..', '..', image.image_url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await image.destroy();

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting product image:', error);
        res.status(500).json({ message: 'Image deletion failed', error: error.message });
    }
};
