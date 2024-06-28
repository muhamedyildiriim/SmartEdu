const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//CONNECT DB
mongoose.connect('mongodb://localhost/smartedu-db', {}).then(() => {
  console.log('DB Connected Successfully');
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//GLOBAL
global.userIN = null;

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
  })
);

//ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute); // http://localhost:3000/
app.use('/courses', courseRoute); // http://localhost:3000/courses
app.use('/categories', categoryRoute); // http://localhost:3000/categories
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
