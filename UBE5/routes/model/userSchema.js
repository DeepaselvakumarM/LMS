const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    enum: ["UG", "PG"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
