const express = require('express');
const router = express.Router();

// Load User model
const userController = require('../controllers/userController')

// Register Route
router.route('/register')
.get((req, res) => res.render('register'))
.post(userController.registerUser)

// Login Route
router.route('/login')
.get((req, res) => res.render('login'))
.post(userController.loginUser)

router.route('/logout')
.get(userController.logoutUser)

// Logout Route

// Update Route
// router.route('/:id')
// .get(userController.getUser)
// .put(userController.updateUser)

module.exports = router;