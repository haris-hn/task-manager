const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    try {
        // Check if Authorization header exists
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extract token
            token = authHeader.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user (exclude password)
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Attach user to request
            req.user = user;

            return next();
        }

        // No token provided
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token missing'
        });

    } catch (error) {
        console.error('AUTH ERROR:', error.message);

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = { protect };