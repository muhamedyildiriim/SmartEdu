# SmartEdu

## Description
**SmartEdu** is a web application designed for managing and enrolling in courses. The backend of this site is developed using Node.js, with popular libraries such as Mongoose, Express, and Nodemailer. The application provides functionalities for adding and removing courses, enrolling in courses, and sending emails via a contact page.

## Features
- **Course Management**: Add and remove courses.
- **Enrollment**: Enroll in available courses.
- **Email Functionality**: Send emails via the contact page.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/smartedu.git
    cd smartedu
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Setup Environment Variables**:
    Create a `.env` file in the root directory and add your MongoDB URI and Nodemailer credentials:
    ```
    MONGODB_URI=your_mongodb_uri
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_pass
    ```

4. **Configure Email Settings**:
    In the `controllers/pageController.js` file, update the `transporter` configuration:
    ```javascript
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password",
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Smart Edu Contact Form 👻" <your_email@gmail.com>', // Update this to your email address
      to: "receiver_email@example.com", // Update this to the receiver's email address
      subject: "Smart Edu Contact Form New Message ✔", // Subject line
      text: "Hello world?", // plain text body
      html: outputMessage, // html body
    });
    ```

5. **Start the Server**:
    ```bash
    npm start
    ```

## Usage
- **Course Management**: Navigate to the admin panel to add or remove courses.
- **Enrollment**: Users can enroll in available courses through the courses page.
- **Contact Form**: Users can send messages via the contact form, and emails will be sent using the configured SMTP settings.

## Configuration
1. **MongoDB**: Ensure you have a MongoDB database set up and update the `MONGODB_URI` in the `.env` file.
2. **Nodemailer**: Update the `SMTP_USER` and `SMTP_PASS` in the `.env` file with your Gmail and app password.
3. **Email Settings**: Customize the `from` and `to` fields in the `transporter.sendMail` function in `pageController.js`.

## How It Works
1. **Backend**: The backend is developed using Node.js, Express, and Mongoose for database operations.
2. **Email**: Nodemailer is used for sending emails via the contact page.
3. **Frontend**: The frontend interacts with the backend APIs for course management and enrollment.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or support, please contact [muhamedyildiriim@gmail.com].