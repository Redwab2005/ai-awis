const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/Email");

//function to sign token
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = async (req, res) => {
  try {
    //user send email ,password and confirm password
    const { email, password, user_name, confirmPassword } = req.body;

    const newUser = await User.create({
      email,
      password,
      user_name,
      confirmPassword,
    });
    //create token
    const token = signToken(newUser._id);
    res.status(200).json({
      status: "success",
      message: "User signed up successfully",
      data: newUser,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    //user send email and password
    const { email, password } = req.body;
    //1) check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }
    //2) check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    //3) if everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//token
//send token

exports.forgotPassword = async (req, res) => {
  //1) get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).json({
      message: " if there is email, the token was send",
    });
  }
  //2) generate the random reset token
  //the rest token work as password so we
  // need to hash it before save it to database
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetToken = resetTokenHash;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes
  await user.save({ validateBeforeSave: false });
  //3) send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and confirmPassword to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  //{{URL}}/api/v1/user/resetPassword/bec484678354db73ab43f575ad28df964e243a6c2e4accad6fe0818eb6087fdf
  try {
    //1) get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    //2) if token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or has expired",
      });
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //3) update changedPasswordAt property for the user
    await user.save();
    //4) log the user in, send JWT
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      message: "Password reset successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
