const jwt = require("jsonwebtoken");

exports.protect = async function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;

    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        next(err);
      } else {
        req.userId = decoded.id;
      }
    });

    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(401).send("Unauthorized Access");
  }
};
