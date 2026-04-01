const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       
        console.error("VALIDATION ERROR:", errors.array());

        // Return clean message
        return res.status(400).json({
            message: errors.array()[0].msg || "Validation failed",
            errors: errors.array()
        });
    }

    return next();
};

module.exports = { validateRequest };