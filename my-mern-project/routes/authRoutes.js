const express = require('express');
const { signup, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Signup Route
router.post('/signup', [
    body('name').notEmpty().withMessage('Name is required.'),
    body('phone').isMobilePhone().withMessage('Valid phone number is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('confirmPassword').notEmpty().withMessage('Confirm Password is required.'),
], signup);

// Login Route
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
], login);

module.exports = router;
