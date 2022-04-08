const express = require("express");
const Course = require("../model/course");
const courses = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const advancedResults = require("../middlewares/advanceResults");

// get all Courses
courses.get("/", advancedResults(Course, "bootcamp"), getCourses);

// get one Course

courses.get("/:courseid", getCourse);

//post all Courses

courses.post("/", createCourse);

//update a Course

courses.put("/:courseid", updateCourse);

//delete a Course

courses.delete("/:courseid", deleteCourse);

module.exports = courses;
