const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.use(verifyToken);

router.post('/', orderController.createOrder);    

router.use(authorizeRoles('admin'));

router.get('/my-orders', orderController.getUserOrders);
router.get('/', orderController.getAllOrders);   
router.put('/:id', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
