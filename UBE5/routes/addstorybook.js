const express = require("express");
const router = express.Router();
const StoryBook = require("./model/addstoryBookSchema"); // ✅ Make sure this path is correct!

// POST: Add new story book
router.post("/add", async (req, res) => {
  try {
    const {Bookid, Bookname, Author, Description, RackNumber, Availability } = req.body;

    if (!Bookid||!Bookname || !Author || !Description || !RackNumber || !Availability) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newStoryBook = new StoryBook({
      Bookid,
      Bookname,
      Author,
      Description,
      RackNumber,
      Availability,
    });

    await newStoryBook.save();
    res.status(201).json({ message: "Story book added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch all story books
router.get("/list", async (req, res) => {
  try {
    const books = await StoryBook.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch story books" });
  }
});

module.exports = router;
