const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Add to wishlist
router.post('/', authenticateToken, wishlistController.addToWishlist);

// Get wishlist
router.get('/', authenticateToken, wishlistController.getWishlist);

// Remove item
router.delete('/:productId', authenticateToken, wishlistController.removeFromWishlist);

module.exports = router;