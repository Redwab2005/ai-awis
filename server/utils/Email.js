const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //define the email options
  const mailOptions = {
    from: process.env.EMAIL_FROM_NAME,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
