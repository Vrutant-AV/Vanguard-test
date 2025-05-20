const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// const dotenv = require('dotenv');
const { User } = require('../models');
// const { where } = require('sequelize');
const sendEmail = require('../utils/sendEmail');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });
  
      const token = generateToken(newUser);
      res.status(201).json({ user: newUser, token });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed', error: err.message });
    }
  };
  
// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.status(200).json({ user, token });
    }
    catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: 'User not found' });

      const token  = crypto.tandomBytes(32).toString('hex');
      const expiry = new Date(Date.now() + 60 * 60 * 1000 );
      
      user.reset_token = token;
      user.reset_token_expiry = expiry;
      await user.save();

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

      await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetUrl}`,
      });
      res.status(200).json({ message: 'Password reset link sent to your email' });

    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ 
      where: { 
        reset_token: token, 
        reset_token_expiry: { [Op.gt]: new Date() } 
      } 
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashed= await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.reset_token = null; 
    user.reset_token_expiry = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};