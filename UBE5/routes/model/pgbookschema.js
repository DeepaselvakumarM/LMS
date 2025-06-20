const mongoose = require("mongoose");

const pgBookSchema = new mongoose.Schema({
  Bookid: { type: String, required: true, unique: true },
  Department: { type: String, required: true },
  Bookname: { type: String, required: true },
  Author: { type: String, required: true },
  Description: { type: String },
  Availability: { type: String, required: true },
  Rack: { type: String, required: true },
});

module.exports = mongoose.model("PgBook", pgBookSchema);
