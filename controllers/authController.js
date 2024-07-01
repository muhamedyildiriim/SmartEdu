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
    console.log("Spesific User");
    console.log(spesificUser.password);
    console.log(password)

    bcrypt.compare(password, spesificUser.password, (err, same) => {
      if (same) {
        //USER SESSION
        req.session.userID = spesificUser._id;
        res.status(200).redirect('/');
      } else {
        res.status(400).json({
          status: 'fail',
        });
      }
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate('courses');
  const categories = await Category.find();
  const courses = await Course.find( {user: req.session.userID} ).sort('-createdAt');

  res.status(200).render('dashboard', {
    user,
    categories,
    courses,
    page_name: 'dashboard',
  });
};
