const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', verifyToken, authorizeRoles('admin'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.put('/:id', verifyToken, authorizeRoles('admin'), productController.updateProduct);
router.delete('/:id', verifyToken, authorizeRoles('admin'), productController.deleteProduct);
router.get('/:id', productController.getProductById);

module.exports = router;