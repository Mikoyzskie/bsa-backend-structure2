const errorTest = (res, req) => {
  res.status(404).send({ error: "User not found" });
  return;
};

module.exports = { errorTest };
