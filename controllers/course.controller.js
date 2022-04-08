const { Bootcamp } = require("../model/bootcamp");
const Course = require("../model/course");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getCourses = asyncHandler(async (req, res, next) => {
  res.send(res.advancedResults);
});

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.courseid }).populate(
    "bootcamp"
  );

  if (!course || course.bootcamp._id != req.params.id) {
    next(new Error());
  }

  res.json(course);
});

exports.createCourse = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
  if (!bootcamp) return next(new Error());

  let course = new Course({
    title: req.body.title,
    hours: req.body.hours,
    bootcamp: bootcamp.id,
    author: req.userId,
  });
  course = await course.save();

  res.json(course);
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });

  let course = await Course.findById(req.params.courseid);

  if (!course || !bootcamp) {
    return next(new Error());
  }

  if (course.author.valueOf() !== req.userId) {
    return next(new Error("Unauthorized"));
  }
  course = await Course.findByIdAndUpdate(req.params.courseid, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(course);
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });
  if (!bootcamp) return next(new Error());

  const course = await Course.findById(req.params.courseid);

  if (!course || course.bootcamp != req.params.id) {
    return next(new Error());
  }

  if (course.author.valueOf() !== req.userId)
    return next(new Error("Unathorized"));

  await course.remove();

  res.status(200).json({
    success: true,
  });
});
