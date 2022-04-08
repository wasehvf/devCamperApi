const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hours: Number,
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Course", Course);
