const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    bio: String,
    location: String,
    dob: String
    
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;