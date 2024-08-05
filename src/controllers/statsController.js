const authService = require("../services/authService");

exports.getStats = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ error: "Not Authorized" });
    }

    const tokenPayload = authService.verifyToken(token);
    if (tokenPayload.type !== "admin") {
      return res.status(401).send({ error: "Not Authorized" });
    }

    const stats = req.app.get("stats");
    res.send(stats);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
