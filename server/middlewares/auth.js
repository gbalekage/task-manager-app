const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../utils/httpError");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new HttpError("Not authenticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new HttpError("Invalid or exipred token", 401));
  }
};

module.exports = auth;
