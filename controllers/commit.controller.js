const Commit = require("../models/commit.model");

// POST
const write = async (req, res) => {
  try {
    const { message, author, repo, commitID } = req.body;
    const commit = new Commit({ message, author, repo, commitID });
    const savedCommit = await commit.save();
    res.json(savedCommit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

module.exports = { write };
