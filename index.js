const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
