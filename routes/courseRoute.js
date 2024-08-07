const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/rolesMiddleware');

const router = express.Router();

router.route('/').post(roleMiddleware(["teacher", "admin"]), courseController.createCourse); // https://localhost:3000/courses
router.route('/').get(courseController.getAllCourses); // http://localhost:3000/courses
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);

module.exports = router;