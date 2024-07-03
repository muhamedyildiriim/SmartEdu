const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const spesificUser = await User.findOne({ email });

  if (spesificUser) {
    bcrypt.compare(password, spesificUser.password, (err, same) => {

      if (same) {
        //USER SESSION
        req.session.userID = spesificUser._id;
        res.status(200).redirect('/users/dashboard');

      } else {
        res.status(400).json({
          status: 'fail',
        });
      }

    });

  } else {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
  });
};
