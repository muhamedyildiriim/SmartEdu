const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {

  const outputMessage = `
  <h1>Mail Details</h1>
  <ul>
    <li>${req.body.name}</li>
    <li>${req.body.email}</li>
  </ul>
  <h1> Message </h1>
  <p>${req.body.message}</p>
  `

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "my382884@gmail.com",
      pass: "tomn qxrs mfyw sopb",
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Smart Edu Contact Form 👻" <my382884@gmail.com>', // sender address
    to: "mby342458@gmail.com", // list of receivers
    subject: "Smart Edu Contact Form New Message ✔", // Subject line
    text: "Hello world?", // plain text body
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

  res.status(200).redirect('contact');

};