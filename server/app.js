const express = require("express");
const userRouter = require("./routes/userRouter.js");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//api/v1/user/signup
app.use(express.json());

app.use("/api/v1/user", userRouter);

module.exports = app;
