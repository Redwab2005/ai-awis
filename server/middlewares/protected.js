const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.protect = (req, res, next) => {
  const token = req.cookies.token; // Directly get the cookie

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token or token has expired",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User no longer exists.",
      });
    }

    req.user = user;
    next();
  });
};
