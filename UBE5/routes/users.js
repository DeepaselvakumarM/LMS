// UpdatedCDode
var express = require("express");
var router = express.Router();
var userSchema = require("../routes/model/userSchema");

// /* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Fetch all users
router.get("/senddata", async function (req, res, next) {
  try {
    const userdata = await userSchema.find();
    res.json({
      status: 200,
      message: userdata,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

// // Register new user
// router.post("/addUser", async function (req, res, next) {
//   try {
//     const { Name, Email, Password } = req.body;

//     // Validate email format (must end with @shanmugha.edu.in)
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@shanmugha\.edu\.in$/;
//     if (!emailRegex.test(Email)) {
//       return res.status(400).json({ message: "Invalid email domain. Use @shanmugha.edu.in" });
//     }

//     // Check if email already exists
//     const emailExist = await userSchema.findOne({ Email });
//     if (emailExist) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Save the user data with Institution
//     const newUser = new userSchema({ Name, Email, Password });
//     await newUser.save();
//     res.status(201).json({ message: "User Registered Successfully" });

//   } catch (error) {
//     console.error("Error in /addUser:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });







router.post("/addUser", async function (req, res, next) {
  try {
    const { Name, Email, Password, Course } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@shanmugha\.edu\.in$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ message: "Invalid email domain. Use @shanmugha.edu.in" });
    }

    const emailExist = await userSchema.findOne({ Email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new userSchema({ Name, Email, Password, Course });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });

  } catch (error) {
    console.error("Error in /addUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;