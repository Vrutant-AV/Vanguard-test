const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully',
    user: req.user,
  });
});

router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) =>{
  res.json({
    message: 'Welcome, Admin!', 
    user: req.user
  });
});

module.exports = router;
