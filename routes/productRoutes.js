const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { singleUpload, multipleUpload } = require('../utils/multer');

router.post(
    '/', verifyToken, authorizeRoles('admin'),
    productController.createProduct
);

router.get(
    '/', productController.getAllProducts
);

router.put(
    '/:id', verifyToken, authorizeRoles('admin'), 
    productController.updateProduct
);

router.delete(
    '/:id', verifyToken, authorizeRoles('admin'), 
    productController.deleteProduct
);

router.get(
    '/:id', productController.getProductById
);

router.post(
    '/image/:productId',
    verifyToken,
    authorizeRoles('admin'),
    singleUpload,
    productController.uploadProductImage
);

router.post(
    '/images/:productId',
    verifyToken,
    authorizeRoles('admin'),
    multipleUpload,
    productController.uploadProductImages
);

router.get(
    '/images/:productId', 
    productController.getProductImages
);

router.put(
    '/images/:imageId',
    verifyToken, authorizeRoles('admin'),
    singleUpload, multipleUpload,
    productController.updateProductImage
);

router.delete(
    '/image/:imageId', 
    verifyToken, authorizeRoles('admin'),
    productController.deleteProductImage 
);

module.exports = router;