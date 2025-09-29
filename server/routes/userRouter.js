const express = require("express");

const userController = require("../controllers/userController");
const { protect } = require("../middlewares/protected");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/resetPassword/:token", userController.resetPassword);
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ success: true, message: "Logged out" });
});
module.exports = router;
