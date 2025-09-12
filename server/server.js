import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sql from "./configs/db.js";
const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 3000;
//localhost:3000/api/v1/
app.get("/api/v1/", async (req, res) => {
  res.json({ message: "Hello from server" });
});
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
