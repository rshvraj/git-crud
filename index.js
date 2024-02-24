const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
// const { Commit } = require("./models/commit.model");
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

const commitSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  timestamps: { type: Date, default: Date.now },
  repo: { type: String, required: true },
  commitID: { type: String, required: true, unique: true },
});

const Commit = mongoose.model("Commit", commitSchema);

// POST
app.post("/commits", async (req, res) => {
  try {
    const { message, author, repo, commitID } = req.body;
    const commit = new Commit({ message, author, repo, commitID });
    const savedCommit = await commit.save();
    res.json(savedCommit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
