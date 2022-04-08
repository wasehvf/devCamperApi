const express = require("express");
const { Bootcamp } = require("../model/bootcamp");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamp.controller");
const advancedResults = require("../middlewares/advanceResults");
const courses = require("./course");
const { protect } = require("../middlewares/auth");

// get all bootcamps

router.get("/", advancedResults(Bootcamp), getBootcamps);

// get one bootcamp

router.get("/:id", getBootcamp);

//post all bootcamps

router.post("/", createBootcamp);

//update a bootcamp

router.put("/:id", updateBootcamp);

//delete a bootcamp

router.delete("/:id", deleteBootcamp);

router.use("/:id/courses", courses);

module.exports = router;
