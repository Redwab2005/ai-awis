exports.protect = (req, res, next) => {
  //1) Getting token and check of it's there
  let authHeader = req.headers.authorization;
  authHeader =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!authHeader) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in!",
    });
  }
  //2) Verification token
  jwt.verify(authHeader, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token or token has expired",
      });
    }
  });

  //if the token is valid, proceed to next middleware
  next();
};
