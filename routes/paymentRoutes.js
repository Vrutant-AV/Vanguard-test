const express = require('express');
const router = express.Router();
const { createOrder, captureOrder } = require('../controllers/paymentController');

router.post('/create-order', createOrder);
router.get('/capture-order/:orderId', captureOrder);

module.exports = router;
