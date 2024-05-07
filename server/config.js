const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/blogify"
const mongoConnect = mongoose.connect(mongoURL)
module.exports = mongoConnect