const express = require("express");
const router = express.Router();
const ReferenceBook = require("./model/referenceBookSchema");

// GET: Fetch all reference books
router.get("/", async (req, res) => {
  try {
    const books = await ReferenceBook.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books." });
  }
});

// GET: Fetch a specific reference book by Bookid
router.get("/:bookid", async (req, res) => {
  const bookid = req.params.bookid;

  try {
    const book = await ReferenceBook.findOne({ Bookid: bookid });

    if (!book) {
      return res.status(404).json({ message: "Reference book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching reference book by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Add a new reference book
router.post("/", async (req, res) => {
  const { Bookid, Bookname, Author, Description, Availability, RackNumber, Category } = req.body;

  // Validate if all fields are provided
  if (!Bookid || !Bookname || !Author || !Description || Availability == null || !RackNumber || !Category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if the book already exists
  const existingBook = await ReferenceBook.findOne({ Bookid });
  if (existingBook) {
    return res.status(409).json({ message: "Book with this ID already exists." });
  }

  const newBook = new ReferenceBook({
    Bookid,
    Bookname,
    Author,
    Description,
    Availability,
    RackNumber,
    Category,
  });

  try {
    await newBook.save();
    res.status(201).json({ message: "Reference book added successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add reference book." });
  }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const ReferenceBook = require("./model/referenceBookSchema");
// const Reservation = require("./model/reservationSchema"); // Assuming Reservation is a model for reservations

// // GET: Fetch all reference books
// router.get("/", async (req, res) => {
//   try {
//     const books = await ReferenceBook.find();
//     // If there are no books, return an empty array with a 200 status.
//     if (books.length === 0) {
//       return res.status(200).json({ message: "No reference books found." });
//     }
//     res.status(200).json(books);
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({ message: "Error fetching books from the database." });
//   }
// });

// // GET: Fetch a specific reference book by Bookid
// router.get("/:bookid", async (req, res) => {
//   const bookid = req.params.bookid;

//   try {
//     const book = await ReferenceBook.findOne({ Bookid: bookid });

//     // If no book is found with the given Bookid, return 404
//     if (!book) {
//       return res.status(404).json({ message: `Reference book with ID ${bookid} not found.` });
//     }

//     res.status(200).json(book);
//   } catch (error) {
//     console.error("Error fetching reference book by ID:", error);
//     res.status(500).json({ message: "Server error while fetching book by ID." });
//   }
// });

// // POST: Add a new reference book
// router.post("/", async (req, res) => {
//   const { Bookid, Bookname, Author, Description, Availability, RackNumber, Category } = req.body;

//   // Validate if all fields are provided
//   if (!Bookid || !Bookname || !Author || !Description || Availability == null || !RackNumber || !Category) {
//     return res.status(400).json({ message: "All fields (Bookid, Bookname, Author, Description, Availability, RackNumber, Category) are required." });
//   }

//   try {
//     // Check if the book already exists by Bookid
//     const existingBook = await ReferenceBook.findOne({ Bookid });
//     if (existingBook) {
//       return res.status(409).json({ message: `Book with ID ${Bookid} already exists.` });
//     }

//     // Create a new reference book document
//     const newBook = new ReferenceBook({
//       Bookid,
//       Bookname,
//       Author,
//       Description,
//       Availability,
//       RackNumber,
//       Category,
//     });

//     // Save the new book to the database
//     await newBook.save();
//     res.status(201).json({ message: "Reference book added successfully!" });
//   } catch (error) {
//     console.error("Error adding new reference book:", error);
//     res.status(500).json({ message: "Failed to add new reference book. Please try again later." });
//   }
// });

// // POST: Reserve a reference book
// router.post("/reserve", async (req, res) => {
//   const { Name, StudentID, Bookid, ReserveDate, ReturnDate } = req.body;

//   // Validate if all required fields are provided
//   if (!Name || !StudentID || !Bookid || !ReserveDate || !ReturnDate) {
//     return res.status(400).json({ message: "All fields (Name, StudentID, Bookid, ReserveDate, ReturnDate) are required." });
//   }

//   try {
//     // Check if the reference book exists in the database
//     const book = await ReferenceBook.findOne({ Bookid });
//     if (!book) {
//       return res.status(404).json({ message: "Reference book not found." });
//     }

//     // Check if the book is available for reservation
//     if (book.Availability <= 0) {
//       return res.status(400).json({ message: "Book is not available for reservation." });
//     }

//     // Create a new reservation for the reference book
//     const newReservation = new Reservation({
//       Name,
//       StudentID,
//       Bookid,
//       ReserveDate,
//       ReturnDate,
//     });

//     // Save the reservation to the database
//     await newReservation.save();

//     // Reduce the availability of the book by 1 (since it's now reserved)
//     book.Availability -= 1;
//     await book.save();

//     res.status(201).json({ message: "Book reserved successfully!" });
//   } catch (error) {
//     console.error("Error reserving the reference book:", error);
//     res.status(500).json({ message: "Failed to reserve the book. Please try again later." });
//   }
// });

// module.exports = router;
