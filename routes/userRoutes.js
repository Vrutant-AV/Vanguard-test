const express = require('express');
const { changePassword } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
