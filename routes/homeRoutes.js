const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/homeController');

router.get('/', getAllProducts);

module.exports = router; 