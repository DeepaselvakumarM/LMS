const mongoose=require('mongoose');




const bookSchema = mongoose.Schema({
    Bookid: { type: String },
    Department: { type: String },
    Bookname: { type: String },
    Author: { type: String },
    Discription: { type: String },
    Availability: { type: Number },
    Rack: { type: String },
  });
  
  const Book = mongoose.model('Book', bookSchema);
  module.exports = Book;
  