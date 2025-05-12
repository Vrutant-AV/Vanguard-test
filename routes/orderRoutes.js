const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles, adminAuth } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// User Routes
router.use(verifyToken);

router.post('/', orderController.createOrder);    

router.get('/my-orders', orderController.getUserOrders);    // Get all orders for the logged-in user
router.get('/tracking/:id', orderController.getOrderTracking);  // Get order tracking
router.get('/history', orderController.getUserOrderHistory);  // Get user's order history
router.put('/cancel/:id', orderController.cancelOrder);  // Cancel order
router.put('/return/request/:id', orderController.requestReturn);  // Request return
router.put('/return/handle/:id', orderController.handleReturn);  // Handle return

// Admin Routes
router.use(authorizeRoles('admin'));

router.get('/', orderController.getAllOrders);  // Get all orders
router.put('/update/:id', orderController.updateOrderStatus);  // Update order status
router.delete('/:id', orderController.deleteOrder);  // Delete order
router.put('/return/:id', authorizeRoles('admin'), orderController.approveReturn);

module.exports = router;
