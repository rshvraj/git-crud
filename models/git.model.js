const mongoose = require("mongoose");

const gitSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String, required: true },
  timestamps: { type: date, default: Date.now },
  repo: { type: string, required: true },
  commitID: { type: String, required: true, unique: true },
});
