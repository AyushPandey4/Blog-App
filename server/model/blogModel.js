const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: String,
  description: String,
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;
