const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
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
        res.status(200).redirect('/');
      } else {
        res.status(400).json({
          status: 'fail',
        });
      }
    });
  }
};
