const mongoose = require('mongoose');

// const reserveSchema = new mongoose.Schema({
//   Name: String,
//   StudentID: String,
//   Email: String,
//   Bookname: String,
//   Feedback: String,
//   Course: String,
//   ReserveDate: String,
//   ReturnDate: String,
//   Returned: Boolean
// });

// module.exports = mongoose.model('reservedetails', reserveSchema);




// reserveBookSchema.js

const reserveSchema = new mongoose.Schema({
  Name: String,
  StudentID: String,
  Email: String,
  Bookname: String,
  Feedback: String,
  Course: String,
  ReserveDate: String,
  ReturnDate: String,
  Returned: Boolean,
  MailSent: { type: Boolean, default: false }  // <-- Add this
});

module.exports = mongoose.model('reservedetails', reserveSchema);
