const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  timestamps: { type: Date, default: Date.now },
  repo: { type: String, required: true },
  commitID: { type: String, required: true, unique: true },
});

const Commit = mongoose.model("Commit", commitSchema);

module.exports = Commit;
