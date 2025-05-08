const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { authenticateToken, authorizeRoles, verifyToken } = require('../middleware/authMiddleware');

router.post('/create-admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await User.create({
            name, 
            email,
            password: hashedPassword,
            role: 'admin',
        });
        res.status(201).json({ message: 'Admin created successfully', admin: { id: newAdmin.id, email: newAdmin.email } });
    }
    catch (err) {
        console.error('Error creating admin:', err);
        res.status(500).json({ message: 'Failed to create admin', error:err.message });
    }
});

router.get('/dashboard', verifyToken, authorizeRoles('admin'), (req, res) => {
      res.json({ message: 'Welcome to the Admin Dashboard' });
    }
);

module.exports = router;