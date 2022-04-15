const User = require("../model/User");
const asyncHandler = require("../middlewares/asyncHandler");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

exports.signup = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already resgistered");

  user = await User.create(req.body);

  res.send(user);
});

exports.login = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) return next(new Error("Unauthorized"));

  const isMatch = await user.matchPassword(req.body.password);

  if (!isMatch) return res.status(401).send("Wrong Credentials");

  jwtToken = await user.getJwtToken(process.env.JWT_SECRET_KEY);

  res.send({ data: user, token: jwtToken });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.userId);
  let { currentPassword, newPassword } = req.body;

  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) return res.status(401).send("Wrong Credentials");

  user.password = newPassword;

  await user.save();
  res.send("Password Changed");
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new Error("Unauthorized"));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "60m",
  });

  user.resetToken = token;

  await user.save();

  sendEmail(token, email);

  res.send(user);
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword, resetToken } = req.body;

  jwt.verify(resetToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    try {
      let user = await User.findById(decoded.id);
      if (!user) return res.status(401).send("Unsuccesful");

      if (user.resetToken != resetToken)
        return res.status(401).send("Unsuccesful");

      user.password = newPassword;
      await user.save();
      res.send(user);
    } catch (err) {
      return res.status(401).send("Unsuccesful");
    }
  });
});
