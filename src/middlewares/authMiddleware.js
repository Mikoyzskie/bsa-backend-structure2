const jwt = require("jsonwebtoken");

exports.validateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send({ error: "Not Authorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.type !== "admin") throw new Error();
    next();
  } catch {
    res.status(401).send({ error: "Not Authorized" });
  }
};
