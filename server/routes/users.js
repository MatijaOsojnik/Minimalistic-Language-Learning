const express = require('express');
const router = express.Router();
// Load User model
const userController = require('../controllers/userController')
const { forwardAuthenticated } = require('../configs/auth');

// Login Route
router.route('/login')
.get(forwardAuthenticated, (req, res) => res.render('login'))
.post(userController.loginUser)

// Register Route
router.route('/register')
.get(forwardAuthenticated, (req, res) => res.render('register'))
.post(userController.registerUser)

// Logout Route

router.route('/logout')
.get(userController.logoutUser)

// Update Route
router.route('/:id')
.get(userController.getUser)
.put(userController.updateUser)

module.exports = router;