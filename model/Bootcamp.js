const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Bootcamp = mongoose.model("Bootcamp", BootcampSchema);

exports.Bootcamp = Bootcamp;
exports.bootcampSchema = BootcampSchema;
