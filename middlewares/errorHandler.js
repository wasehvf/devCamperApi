module.exports = (err, req, res, next) => {
  if (err.message == "Wrong Endpoint") {
    return res.status(500).send({ error: err.message });
  }

  if (err.name == "JsonWebTokenError" || err.message == "Unauthorized")
    return res.status(401).send({ error: "Unauthorized Access" });

  if (
    err.name == "CastError" ||
    err.name == "Error" ||
    err.name == "TypeError"
  ) {
    return res.status(404).send({ error: "Object Not Found" });
  }

  res.status(500).send({ error: "Something Went Wrong" });
  next();
};
