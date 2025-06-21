const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');

// Route cho đăng ký
router.post('/register', registerUser);

// Route cho đăng nhập
router.post('/login', loginUser);

module.exports = router;
