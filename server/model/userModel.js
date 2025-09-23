const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 8,
    select: false, //dont include the password when you reuqest user
  },
  user_name: {
    type: String,
    default: "user",
  },
  profile_picture: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
