
const express = require("express");
const router = express.Router();

const reserveSchema = require("./model/reserveBookSchema");
const bookSchema = require("./model/bookSchema");
const storyBookSchema = require("./model/addstoryBookSchema");
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config()

// Default route
router.get("/", (req, res) => {
  res.send("Reserve book backend");
});

// POST: Reserve a book (storybook or textbook)
// router.post("/addreserve", async (req, res) => {
//   try {
//     const {
//       Name,
//       StudentID,
//       Email,
//       Bookname,
//       Course,
//       ReserveDate,
//       ReturnDate,
//     } = req.body;

//     const trimmedBookname = Bookname.trim();

//     let book = await bookSchema.findOne({
//       Bookname: { $regex: new RegExp(`^${trimmedBookname}$`, "i") },
//     });

//     let isStoryBook = false;

//     if (!book) {
//       book = await storyBookSchema.findOne({
//         Bookname: { $regex: new RegExp(`^${trimmedBookname}$`, "i") },
//       });
//       isStoryBook = true;
//     }

//     if (!book) {
//       return res.status(404).json({ status: 404, message: "Book not found" });
//     }

//     if (!book.Availability || book.Availability <= 0) {
//       return res.status(400).json({ status: 400, message: "Book out of stock" });
//     }

//     const newReservation = new reserveSchema({
//       Name,
//       StudentID,
//       Email,
//       Bookid: book.Bookid,
//       Bookname: book.Bookname,
//       Course,
//       ReserveDate,
//       ReturnDate,
//       Returned: false,
//     });

//     await newReservation.save();

//     book.Availability -= 1;
//     await book.save();

//     res.status(200).json({
//       status: 200,
//       message: "Book successfully reserved",
//       isStoryBook,
//     });
//   } catch (error) {
//     console.error("Error reserving book:", error);
//     res.status(500).json({ message: "Error reserving book" });
//   }
// });




//working API

// Configure email transporter (add this at the top of your file)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/addreserve", async (req, res) => {
  try {
    const {
      Name,
      StudentID,
      Email,
      Bookname,
      Course,
      ReserveDate,
      ReturnDate,
    } = req.body;

    // 1. First handle the reservation (your existing logic)
    const trimmedBookname = Bookname.trim();

    let book = await bookSchema.findOne({
      Bookname: { $regex: new RegExp(`^${trimmedBookname}$`, "i") },
    });

    let isStoryBook = false;

    if (!book) {
      book = await storyBookSchema.findOne({
        Bookname: { $regex: new RegExp(`^${trimmedBookname}$`, "i") },
      });
      isStoryBook = true;
    }

    if (!book) {
      return res.status(404).json({ status: 404, message: "Book not found" });
    }

    if (!book.Availability || book.Availability <= 0) {
      return res.status(400).json({ status: 400, message: "Book out of stock" });
    }

    const newReservation = new reserveSchema({
      Name,
      StudentID,
      Email,
      Bookid: book.Bookid,
      Bookname: book.Bookname,
      Course,
      ReserveDate,
      ReturnDate,
      Returned: false,
    });

    await newReservation.save();

    book.Availability -= 1;
    await book.save();

    // 2. Send confirmation email
    try {
      await transporter.sendMail({
        from: `Library System <${process.env.EMAIL_USER}>`,
        to: Email,
        subject: `Reservation Confirmation: ${book.Bookname}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #2563eb;">Reservation Confirmed</h2>
            <p>Dear ${Name},</p>
            
            <p>Your reservation for <strong>${book.Bookname}</strong> has been successfully processed.</p>
            
            <h3 style="color: #2563eb;">Reservation Details</h3>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>Book Title:</strong> ${book.Bookname}</li>
              <li><strong>Book ID:</strong> ${book.Bookid}</li>
              <li><strong>Student ID:</strong> ${StudentID}</li>
              <li><strong>Reservation Date:</strong> ${ReserveDate}</li>
              <li><strong>Return Date:</strong> ${ReturnDate}</li>
            </ul>
            
            <p style="margin-top: 20px;">
              <strong>Important:</strong> Please collect your book from the library within 2 working days.
            </p>
            
            <p>Thank you for using our library services!</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(200).json({
      status: 200,
      message: "Book successfully reserved and confirmation email sent",
      isStoryBook,
    });

  } catch (error) {
    console.error("Error reserving book:", error);
    res.status(500).json({ message: "Error reserving book" });
  }
});















// GET: Get all reservations
router.get("/getreserve", async (req, res) => {
  try {
    const reserve = await reserveSchema.find();
    res.json({
      status: 200,
      message: reserve,
    });
  } catch (error) {
    console.error("Error getting reservations:", error);
    res.status(500).json({ message: "Error fetching reservations" });
  }
});

// DELETE: Delete a reservation by ID and update book availability
router.delete("/deletereserve/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await reserveSchema.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const bookName = deletedReservation.Bookname;

    let updatedBook = await bookSchema.findOneAndUpdate(
      { Bookname: bookName },
      { $inc: { Availability: 1 } },
      { new: true }
    );

    if (!updatedBook) {
      updatedBook = await storyBookSchema.findOneAndUpdate(
        { Bookname: bookName },
        { $inc: { Availability: 1 } },
        { new: true }
      );
    }

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      status: 200,
      message: "Reservation successfully deleted and book availability updated",
      deletedReservation,
      updatedBook,
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Error deleting reservation" });
  }
});

// PUT: Return a book and update availability
router.put("/returnbook/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await reserveSchema.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    if (reservation.Returned) {
      return res.status(400).json({ message: "Book already returned." });
    }

    reservation.Returned = true;
    await reservation.save();

    const bookName = reservation.Bookname;

    let updatedBook = await bookSchema.findOneAndUpdate(
      { Bookname: bookName },
      { $inc: { Availability: 1 } },
      { new: true }
    );

    if (!updatedBook) {
      updatedBook = await storyBookSchema.findOneAndUpdate(
        { Bookname: bookName },
        { $inc: { Availability: 1 } },
        { new: true }
      );
    }

    res.status(200).json({ message: "Book successfully returned." });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Error returning book" });
  }
});



router.get("/calculateFine/:id", async (req, res) => {
  const { id } = req.params;
  const finePerDay = 1;

  try {
    const reservation = await reserveSchema.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    if (reservation.Returned) {
      return res.status(200).json({ fine: 0 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const returnDate = new Date(reservation.ReturnDate);
    returnDate.setHours(0, 0, 0, 0);

    // Fine calculation starts ONLY AFTER return date is passed
    if (today <= returnDate) {
      return res.status(200).json({ fine: 0 });
    }

    const diffTime = today - returnDate;
    const overdueDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const fine = overdueDays * finePerDay;

    return res.status(200).json({ fine });
  } catch (error) {
    console.error("Error calculating fine:", error);
    return res.status(500).json({ message: "Error calculating fine" });
  }
});










//Mail Sending 


// router.get("/sendDueReminders", async (req, res) => {
//   try {
//     await sendReminderEmails();
//     res.status(200).json({ message: "Reminder emails sent successfully." });
//   } catch (error) {
//     console.error("Error sending reminders:", error);
//     res.status(500).json({ message: "Error sending reminders" });
//   }
// });

// ✨ Helper function to send emails (ONLY CHANGE MADE)
async function sendReminderEmails() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const istDate = new Date(today.getTime() + (5.5 * 60 * 60 * 1000)); // Convert to IST
    const formattedToday = istDate.toISOString().split('T')[0]; // "2025-04-29"

    // ONLY CHANGED THIS QUERY to check MailSent status
    const dueReservations = await reserveSchema.find({
      Returned: false,
      ReturnDate: formattedToday,
      $or: [
        { MailSent: { $exists: false } },
        { MailSent: false }
      ]
    });

    if (dueReservations.length === 0) {
      console.log("[INFO] No books due today or emails already sent.");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'librarymanagement2025@gmail.com',
        pass: 'ymhg wesb rfvi worv'
      }
    });

    for (const reservation of dueReservations) {
      const mailOptions = {
        from: 'librarymanagement2025@gmail.com',
        to: reservation.Email,
        subject: 'Library Book Return Reminder',
        html: `
          <p>Hello ${reservation.Name},</p>
          <p>This is a gentle reminder to return your book:</p>
          <ul>
            <li><strong>Book Name:</strong> ${reservation.Bookname}</li>
            <li><strong>Due Date:</strong> ${reservation.ReturnDate}</li>
          </ul>
          <p>Please make sure to return it today to avoid fines. Thank you!</p>
          <br>
          <p>Library Management System</p>
        `
      };

      try {
        const result = await transporter.sendMail(mailOptions);
        console.log(`[✅ SUCCESS] Mail sent to ${reservation.Email} (Message ID: ${result.messageId})`);

        // Update database MailSent to true
        await reserveSchema.findByIdAndUpdate(reservation._id, { MailSent: true });

      } catch (mailError) {
        console.error(`[❌ ERROR] Failed to send mail to ${reservation.Email}`, mailError);
        
        // Optional: If you want, mark MailSent as false or leave it
        await reserveSchema.findByIdAndUpdate(reservation._id, { MailSent: false });
      }
    }
  } catch (error) {
    console.error("[❌ ERROR] Failed to process reminders:", error);
  }
}

// Changed cron schedule from every minute to daily at 9:00 AM IST (ONLY CHANGE HERE)
cron.schedule('* * * * *', async () => { // 3:30 UTC = 9:00 AM IST
  console.log("[CRON] Running daily email check");
  await sendReminderEmails();
});


// Update your existing /getDueToday route or create a new one
// In your backend routes (ensure this exists)
router.get("/getDueToday", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const istDate = new Date(today.getTime() + (5.5 * 60 * 60 * 1000));
    const formattedToday = istDate.toISOString().split('T')[0];

    const dueReservations = await reserveSchema.find({
      ReturnDate: formattedToday
    });

    res.status(200).json(dueReservations);
  } catch (error) {
    console.error("Error fetching due today:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports=router