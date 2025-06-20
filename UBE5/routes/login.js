var express = require("express");
var router = express.Router();
var userSchema = require("../routes/model/userSchema");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource In Login");
});

router.post("/verfiy", async function (req, res, next) {
  try {
    const { Email, Password } = req.body;

    // Find user by email
    const userDetail = await userSchema.findOne({ Email });

    if (!userDetail) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    // ✅ Get the saved password from the database
    const savedPassword = userDetail.Password;
    // ✅ Directly compare plain text passwords
    if (Password !== savedPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login Successfully", user: userDetail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;



