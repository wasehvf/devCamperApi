const { Bootcamp } = require("../model/bootcamp");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.send(res.advancedResults);
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });

  if (!bootcamp) {
    return next(new Error());
  }
  res.json(bootcamp);
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  req.body.author = req.userId;
  const newBootcamp = await Bootcamp.create(req.body);
  res.status(201).send(newBootcamp);
});
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new Error());
  }

  if (bootcamp.author.valueOf() !== req.userId) {
    return next(new Error());
  }
  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(bootcamp);
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new Error());
  }

  if (bootcamp.author.valueOf() !== req.userId) {
    return next(new Error());
  }

  bootcamp = await Bootcamp.deleteOne({ _id: req.params.id });
  if (bootcamp.deletedCount == 0) return next(new Error());
  res.status(200).send("successful");
});
