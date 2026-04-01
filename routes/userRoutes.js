const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validator');

// 🔥 Register Route
router.post(
    '/register',
    [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required'),

        body('email')
            .trim()
            .isEmail()
            .withMessage('Please include a valid email')
            .normalizeEmail(),

        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
    ],
    validateRequest,
    registerUser
);

// 🔥 Login Route
router.post(
    '/login',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please include a valid email')
            .normalizeEmail(),

        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ],
    validateRequest,
    loginUser
);

module.exports = router;