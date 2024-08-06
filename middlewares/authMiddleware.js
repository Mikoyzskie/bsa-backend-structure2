const jwt = require("jsonwebtoken");

const authMiddleware = (req, res) => {
  try {
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
    } catch (err) {
      return res.status(401).send({ error: "Not Authorized" });
    }
    const stats = req.app.get("stats");
    res.send(stats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;
  }
};

module.exports = { authMiddleware };
