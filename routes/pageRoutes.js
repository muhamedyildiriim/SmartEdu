const express = require('express');
const pageController = require('../controllers/pageControllers');

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // http://localhost:3000/index
router.route('/about').get(pageController.getAboutPage); // http://localhost:3000/about
router.route('/register').get(pageController.getRegisterPage); // http://localhost:3000/register
router.route('/login').get(pageController.getLoginPage); // http://localhost:3000/login
router.route('/contact').get(pageController.getContactPage); // http://localhost:3000/contact
router.route('/contact').post(pageController.sendEmail); // http://localhost:3000/contact

//tomn qxrs mfyw sopb
module.exports = router;