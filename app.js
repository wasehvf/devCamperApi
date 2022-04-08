const express = require("express");
const bootcampRoutes = require("./routes/bootcamp");
const authRoutes = require("./routes/auth");
const dbConnection = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const { protect } = require("./middlewares/auth");
require("dotenv").config();
const app = express();

app.use(express.json());

//middlewares
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

//undefined routers
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
