const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');

const app = express();

//CONNECT DB
// mongoose.connect('mongodb://localhost/smartedu-db')
// .then(console.log('Connected to DB succesfully'));
mongoose.connect('mongodb://localhost/smartedu-db', {})
.then(() => {
  console.log('DB Connected Successfully');
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
