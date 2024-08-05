const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  token = token.replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid Token");
  }
};
