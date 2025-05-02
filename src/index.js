import express from "express";
import dotenv from "dotenv";
import database from "./config/db.js";

dotenv.config();

const app = express();

// Middleware (optional): if you want to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

// Connect to Database
database();

// Set Port
const PORT = process.env.PORT || 8000;

// Start Server
app.listen(PORT, () => {
  console.info(`Connected to the server: ${PORT}`);
});
