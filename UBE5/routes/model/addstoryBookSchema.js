// const mongoose = require('mongoose');

// const storyBookSchema = new mongoose.Schema({
//   BookId: String,
//   Bookname: String,
//   Author: String,
//   Description: String,
//   Availability: Number,
//   RackNumber: String
// });

// module.exports = mongoose.model("StoryBook", storyBookSchema);

const mongoose = require("mongoose");

const storyBookSchema = new mongoose.Schema({
  Bookid: {
    type: String,
    required: true,
  },
  Bookname: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  RackNumber: {
    type: String,
    required: true,
  },
  Availability: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("StoryBook", storyBookSchema);
