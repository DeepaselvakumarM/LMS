var express = require("express");
var router = express.Router();
var adminSchema = require("./model/adminSchema");

/* GET Admin Login Page */
router.get("/", function (req, res) {
  res.send("Admin login page");
});

// ✅ Add Admin Route
router.post("/addadmin", async function (req, res) {
  try {
    const { Name, Password } = req.body;

    // Check if admin already exists
    const adminExist = await adminSchema.findOne({ Name });
    if (adminExist) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin entry
    const newAdmin = new adminSchema({ Name, Password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error in /addadmin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Admin Login Route
router.post("/logadmin", async function (req, res) {
  try {
    const { Name, Password } = req.body;

    // Check if admin credentials are correct
    const adminExist = await adminSchema.findOne({ Name, Password });
    if (!adminExist) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    res.status(200).json({ message: "Admin login successful" });
  } catch (error) {
    console.error("Error in /logadmin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
