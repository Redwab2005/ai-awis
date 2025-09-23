const User = require("../model/userModel");
//this function need alot of modifications like hashing the password
// and validating the email and password
//and other improvements
exports.signup = async (req, res) => {
  const { email, password, user_name } = req.body;
  console.log(email, password);

  // if there is no email or password or user_name return 400 error
  if (!email || !password || !user_name) {
    return res.status(400).send("All fields are required");
  }
  const newUser = await User.create({
    email,
    password,
    user_name,
  });
  res.status(200).json({
    status: "success",
    message: "User signed up successfully",
    data: newUser,
  });
};
