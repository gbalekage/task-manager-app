const User = require("../models/User");
const HttpError = require("../utils/httpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.params;
    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields", 400));
    }

    const newEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return next(new HttpError("The email is already in use", 400));
    }

    if (password !== password2) {
      return next(new HttpError("Passwords do not match", 400));
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });

    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Server error", 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill in all fields", 400));
    }

    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid Email", 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new HttpError("Incorrect password", 400));
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Loggedin success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Server error", 500));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return next(new HttpError("User not found!", 404));
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Server error", 500));
  }
};

module.exports = { createUser, login, getUser };
