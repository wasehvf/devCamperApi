const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const hpp = require("hpp");
const rateLimiter = require("express-rate-limit");
const bootcampRoutes = require("./routes/bootcamp");
const authRoutes = require("./routes/auth");
const dbConnection = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const { protect } = require("./middlewares/auth");

require("dotenv").config();

const app = express();
const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
  message: "You have achieved your requests limit, try again in 10 mins",
});

//middlewares

app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(hpp());
//rate limiter

app.use(limiter);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    res.status(200);
  }
  next();
});
//logger
app.use(logger);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/bootcamps", protect, bootcampRoutes);

//undefined routes
app.get("*", function (req, res, next) {
  next(new Error("Wrong Endpoint"));
});

//custom Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  dbConnection();
});
