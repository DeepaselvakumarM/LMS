const express = require("express");
const Suggestion = require("./model/suggestSchema");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("suggestion backend");
});

// ✅ POST - User submits a suggestion
router.post("/add", async (req, res) => {
  try {
    const { userId, name, email, message } = req.body;

    if (!userId || !name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSuggestion = new Suggestion({ userId, name, email, message });
    await newSuggestion.save();
    res.status(201).json({ message: "Suggestion submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET - Admin retrieves all suggestions
router.get("/all", async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
