const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const aiRouter = require("./routes/aiRouter");
const cors = require("cors");
dotenv.config();
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you use cookies/auth
  })
);
app.use(express.json());

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/ai", aiRouter);

module.exports = app;
