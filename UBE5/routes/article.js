var express = require("express");
var router = express.Router();
var article = require("./model/articleSchema");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Atricle Page");
});

router.post("/postarticle", async function (req, res, next) {
  try {
    const data = new article(req.body);
    await data.save();
    res.status(201).json({ message: "Article Posted Successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getarticle", async function (req, res, next) {
  try {
    const articles = await article.find().sort({ createdAt: -1 }); // Latest first
    res.json({
      status: 200,
      message: articles,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = router;
