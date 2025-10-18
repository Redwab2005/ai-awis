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
    required: function () {
      return this.isModified("password") || this.isNew;
    },
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
  premiumExpiresAt: Date,
  premiumPaymentDate: Date,
  paymentMethod: {
    type: String,
    enum: ["card", "paypal", "applePay", "googlePay"],
  },
  premiumPlan: {
    type: String,
    enum: ["monthly", "yearly"],
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//middleware to hash password before saving
userSchema.pre("save", async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined; //do not save confirm password in db
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; //subtract 1 sec to ensure token is created after password has been changed
  next();
});
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
