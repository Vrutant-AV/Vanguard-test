const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');
dotenv.config();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};

// Middleware to authorize user roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: 'Access forbidden: insufficient permissions' });
        }
        next();
    };
};

// Middleware to verify token and get user details
const verifyToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
  
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
  
      req.user = user;
      next();
    } catch (err) {
      console.error('JWT verification failed:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { authenticateToken, authorizeRoles, verifyToken };
