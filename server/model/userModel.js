const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Please provide a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 8,
    select: false, //dont include the password when you reuqest user
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
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

//middleware to hash password before saving
userSchema.pre("save", async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined; //do not save confirm password in db
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
