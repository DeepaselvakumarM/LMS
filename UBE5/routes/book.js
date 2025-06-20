
var express = require("express");
var router = express.Router();
var Book = require("./model/bookSchema");

// Route to get home page
router.get("/", function (req, res, next) {
  res.send("Add Books schema");
});

// Add new book
router.post("/addbook", async function (req, res, next) {
  try {
    const bookid = req.body.Bookid;
    console.log("Received Book Data:", req.body);
    const bookExist = await Book.findOne({ Bookid: bookid });
    if (bookExist) {
      return res.status(400).json({ message: "Book already Exists" });
    } else {
      const data = new Book(req.body);
      await data.save();
      res.status(201).json({ message: "Book Added Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding book" });
  }
});

// Get all books
router.get("/getbook", async function (req, res, next) {
  try {
    const bookdata = await Book.find();
    console.log("Fetched Book Data:", bookdata);
    res.json({
      status: 200,
      message: bookdata,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

// Update book details
router.put("/updatebook/:id", async (req, res) => {
  const { id } = req.params;
  const { Bookid, Department, Bookname, Description, Availability, Rack } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { Bookid, Department, Bookname, Description, Availability, Rack },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(500).json({ error: "Error updating book" });
  }
});

// Delete a book using Bookid (not _id)
router.delete("/deletebook/:Bookid", async function (req, res, next) {
  try {
    const { Bookid } = req.params;
    console.log("Attempting to delete Bookid:", Bookid);

    const deletedBook = await Book.findOneAndDelete({ Bookid: Bookid });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      status: 200,
      message: "Book successfully deleted",
      deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting book" });
  }
});
// router.get("/count", async function (req, res) {
//   try {
//     // Count documents where Bookid and Bookname are valid
//     const count = await Book.countDocuments({
//       Bookid: { $exists: true, $ne: null },
//       Bookname: { $exists: true, $ne: null },
//     });

//     res.json({ count });
//   } catch (error) {
//     console.error("Error retrieving book count:", error);
//     res.status(500).json({ message: "Error retrieving book count" });
//   }


module.exports = router;


