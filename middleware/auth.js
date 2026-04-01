const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user 
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            return next(); 
        }

        // No token
        return res.status(401).json({ message: 'Not authorized, no token' });

    } catch (error) {
        console.error("AUTH ERROR:", error.message);
        return res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = { protect };