const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const aiRouter = require("./routes/aiRouter");

dotenv.config();

const app = express();
app.use(express.json());

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/ai", aiRouter);

module.exports = app;
