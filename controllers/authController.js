const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);

    for(let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const spesificUser = await User.findOne({ email });

  if (spesificUser) {
    if (spesificUser.password === password) {
      req.session.userID = spesificUser._id;
      res.status(200).redirect('/users/dashboard');
    } else {
      req.flash('error', 'Your password is not correct!');
      res.status(400).redirect('/login');
    }
  } else {
    req.flash('error', 'User is not exist!');
    res.status(400).redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
  });
};
