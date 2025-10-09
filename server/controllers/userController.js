const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/Email");
const Email = require("../utils/Email");

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
    await new Email(newUser).sendWelcom();
    //create token
    const token = signToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true only in production with HTTPS
      sameSite: "lax", // or "none" if frontend and backend are on different domains
    });

    res.status(200).json({
      status: "success",
      message: "User signed up successfully",
      data: newUser,
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
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: { user_name: user.user_name },
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
  try {
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
    const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and confirmPassword to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await new Email(user, message).sendResetPassword();

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
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
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
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ status: "success" });
};

exports.subscribeToPremium = async (req, res) => {
  try {
    const { plan, paymentMethod } = req.body;
    if (!plan && !paymentMethod) {
      res.status(400).json({
        status: "fail",
        message: "Please provide plan and payment method",
      });
    }
    const startDate = new Date();
    const periodEnd = new Date(
      plan === "yearly"
        ? startDate.getTime() + 365 * 24 * 60 * 60 * 1000
        : startDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );
    // Update user's premium status
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    //check if user is already premium
    if (user.isPremium) {
      return res.status(400).json({
        status: "fail",
        message: "User is already premium",
      });
    }
    // Update user's premium status
    user.isPremium = true;
    user.premiumPlan = plan;
    user.paymentMethod = paymentMethod;
    user.premiumPaymentDate = startDate;
    user.premiumExpiresAt = periodEnd;
    await user.save();

    try {
      await new Email(user).sendSubscriptionConfirmation({
        plan,
        amount: plan === "yearly" ? 96 : 12,
        currency: "USD",
        paymentMethod,
        periodEnd: periodEnd.toDateString(),
      });
    } catch (e) {
      // Non-blocking email failure
    }

    res.status(200).json({
      status: "success",
      message: "Successfully subscribed to premium!",
      data: {
        user: user,
        plan: plan,
        paymentMethod: paymentMethod,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    // Update user's premium status to false
    const user = await User.findById(req.user._id);
    if (user.isPremium === false) {
      return res.status(400).json({
        status: "fail",
        message: "User is not premium",
      });
    }

    user.isPremium = false;
    user.premiumPlan = null;
    user.paymentMethod = null;
    user.premiumPaymentDate = null;
    user.premiumExpiresAt = null;
    await user.save();
    // Optional: if you keep track of period end, include it here
    try {
      await new Email(user).sendCancellationConfirmation({
        currentPeriodEnd: undefined,
      });
    } catch (e) {
      // Non-blocking email failure
    }

    res.status(200).json({
      status: "success",
      message:
        "Subscription cancelled successfully. You're now on the free plan.",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
