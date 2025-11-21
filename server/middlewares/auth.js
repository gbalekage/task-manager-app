const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../utils/httpError");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new HttpError("Authentication failed: No token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error(err);
    return next(new HttpError("Authentication failed: Invalid token", 401));
  }
};

module.exports = auth;
