const mongoose = require("mongoose");

const referenceBookSchema = new mongoose.Schema(
  {
    Bookid: {
      type: String,
      required: true,
      unique: true,
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
    },
    Availability: {
      type: Number,
      required: true,
    },
    RackNumber: {
      type: String,
    },
    Category: {
      type: String,
      default: "Reference Book",
    },
  },
  { timestamps: true }
);

const ReferenceBook = mongoose.model("ReferenceBooks", referenceBookSchema);

module.exports = ReferenceBook;

// const mongoose = require("mongoose");

// const referenceBookSchema = new mongoose.Schema(
//   {
//     Bookid: { type: String, required: true },
//     Bookname: { type: String, required: true },
//     Author: { type: String, required: true },
//     Description: { type: String, required: true },
//     Availability: { type: Number, required: true },
//     RackNumber: { type: String, required: true },
//     Category: { type: String, default: "Reference" }, // Default category
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("ReferenceBook", referenceBookSchema);




// const mongoose = require("mongoose");

// const referenceReservationSchema = new mongoose.Schema({
//   Name: String,
//   StudentID: String,
//   Email: String,
//   Bookname: String,
//   Feedback: String,
//   ReserveDate: Date,
//   ReturnDate: Date,
// });

// module.exports = mongoose.model("ReferenceReservation", referenceReservationSchema);


// const mongoose = require("mongoose");

// const referenceBookSchema = new mongoose.Schema({
//   Bookid: { type: String, required: true },
//   Bookname: { type: String, required: true },
//   Author: { type: String, required: true },
//   Description: { type: String, required: true },
//   Availability: { type: Number, required: true }, // Number of copies available
//   RackNumber: { type: String, required: true },
//   Category: { type: String, required: true },
// });

// module.exports = mongoose.model("ReferenceBook", referenceBookSchema);
