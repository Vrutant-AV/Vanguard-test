const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles, adminAuth } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.use(verifyToken);

router.post('/', orderController.createOrder);    

// router.get('/my-orders', orderController.getUserOrders);
router.get('/tracking/:id', orderController.getOrderTracking);
router.get('/history', orderController.getUserOrderHistory);
router.put('/cancel/:id', orderController.cancelOrder);
router.put('/return/request/:id', orderController.requestReturn); 
router.put('/return/handle/:id', orderController.handleReturn);  

router.use(authorizeRoles('admin'));

router.get('/', orderController.getAllOrders);  
router.put('/update/:id', orderController.updateOrderStatus); 
router.delete('/:id', orderController.deleteOrder);
router.put('/return/:id', authorizeRoles('admin'), orderController.approveReturn);

module.exports = router;
