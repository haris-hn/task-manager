const express = require('express');
const router = express.Router();

const {
    getTasks,
    setTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validator');

// 🔥 Apply protect per route (better debugging)
router.get('/', protect, getTasks);

router.post(
    '/',
    protect,
    [
        body('title', 'Title is required').not().isEmpty(),
        body('description', 'Description is required').not().isEmpty()
    ],
    validateRequest,
    setTask
);

router.put(
    '/:id',
    protect,
    [
        body('title').optional().not().isEmpty().withMessage('Title cannot be empty'),
        body('description').optional().not().isEmpty().withMessage('Description cannot be empty')
    ],
    validateRequest,
    updateTask
);

router.delete('/:id', protect, deleteTask);

module.exports = router;