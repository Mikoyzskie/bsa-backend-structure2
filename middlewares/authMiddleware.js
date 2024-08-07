const jwt = require("jsonwebtoken");

const authMiddlewareAdmin = async (req, res, next) => {
  var ak = "authorization";
  let token = req.headers[ak];
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
const authMiddleware = async (req, res, next) => {
  let token = req.headers[`authorization`];
  let tokenPayload;
  if (!token) {
    return res.status(401).send({ error: "Not Authorized" });
  }
  token = token.replace("Bearer ", "");
  try {
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.tokenPayload = tokenPayload;
    next();
    return res.send(tokenPayload);
  } catch (err) {
    return res.status(401).send({ error: "Not Authorized" });
  }
};

module.exports = { authMiddleware, authMiddlewareAdmin };
