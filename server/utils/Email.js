const nodeMailer = require("nodemailer");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //sendgrid
      return nodeMailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    //nodemailer for development
    return nodeMailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, message) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: this.to,
      subject: subject,
      text: message,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcom() {
    await this.send(
      "Welcome to the family!",
      `Welcome to the family! We're so excited to have you on board.`
    );
  }

  async sendResetPassword() {
    await this.send(
      "Your password reset token (valid for only 10 minutes)",
      `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.\nIf you didn't forget your password, please ignore this email!`
    );
  }
};
