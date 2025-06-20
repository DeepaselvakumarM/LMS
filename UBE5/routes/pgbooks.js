const express = require("express");
const router = express.Router();
const PgBook = require("./model/PgBook");

router.post("/pgaddbook", async (req, res) => {
  const { Bookid, Department, Bookname, Author, Description, Availability, Rack } = req.body;

  try {
    const existingBook = await PgBook.findOne({ Bookid });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const newBook = new PgBook({
      Bookid,
      Department,
      Bookname,
      Author,
      Description,
      Availability,
      Rack,
    });

    await newBook.save();
    res.status(201).json({ message: "PG Book added successfully" });
  } catch (error) {
    console.error("Error adding PG book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
