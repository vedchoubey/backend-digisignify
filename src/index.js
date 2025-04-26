const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/db");
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello from serverkjkm");
});

database();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.info(`Connected to the server: ${PORT}`);
});
