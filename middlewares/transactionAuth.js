const jwt = require("jsonwebtoken");

const transactionAuthorization = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "Not Authorized" });
  }
  token = token.replace("Bearer ", "");
  try {
    var tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenPayload.type != "admin") {
      throw new Error();
    }
    next();
  } catch (err) {
    return res.status(401).send({ error: "Not Authorized" });
  }
};

module.exports = { transactionAuthorization };
