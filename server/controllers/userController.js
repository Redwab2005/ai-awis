const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
