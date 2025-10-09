const dotenv = require("dotenv");
dotenv.config();
const { default: mongoose } = require("mongoose");
const app = require("./app.js");
const connectCloudinary = require("./configs/cloudinary.js");
const PORT = process.env.PORT || 3000;
const subscriptionChecker = require("./jobs/subscriptionChecker");
subscriptionChecker();
connectCloudinary();

//db string
const db = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(db).then(() => {
  console.log("DB connection successful");
});
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
