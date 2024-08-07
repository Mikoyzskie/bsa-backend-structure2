const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
  return;
};

const handleNotFound = (req, res) => {
  return res.status(404).send({ error: "User not found" });
};

module.exports = { errorHandler, handleNotFound };
