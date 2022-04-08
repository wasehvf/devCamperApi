const express = require("express");
const {
  signup,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { protect } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", protect, changePassword);
router.post("/forgot-password", protect, forgotPassword);
router.post("/reset-password", protect, resetPassword);

module.exports = router;
