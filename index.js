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

//GET

app.get("/commits", async (req, res) => {
  try {
    const { startTime, endTime, author, repo } = req.query;
    const query = {
      timestamps: { $gte: new Date(startTime), $lte: new Date(endTime) },
      author,
      repo,
    };
    const commits = await Commit.find(query);
    res.json(commits);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
app.delete("/commits/:id", async (req, res) => {
  try {
    const deletedCommit = await Commit.findByIdAndDelete(req.params.id);
    if (!deletedCommit) {
      return res.status(404).json({ error: "Commit not found" });
    }
    res.json(deletedCommit);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

//Update

app.put("/commits/:id", async (req, res) => {
  try {
    const { message } = req.body;
    const updatedCommit = await Commit.findByIdAndUpdate(
      req.params.id,
      { message },
      { new: true }
    );
    if (!updatedCommit) {
      return res.status(404).json({ error: "Commit not found" });
    }
    return updatedCommit;
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
