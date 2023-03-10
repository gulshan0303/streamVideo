const express = require('express');
const router = express.Router();
const {registerController,loginController,logoutController} = require('../controller/authController');

// Public routes
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);


module.exports = router;