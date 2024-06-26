const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/signup').post(authController.createUser); //  https://localhost:3000/users/signup
router.route('/login').post(authController.loginUser); //  https://localhost:3000/users/login
router.route('/logout').get(authController.logoutUser); //  https://localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //  https://localhost:3000/users/dashboard

module.exports = router;