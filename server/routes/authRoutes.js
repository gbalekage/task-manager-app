const express = require("express");
const { createUser, login, getUser } = require("../controllers/authController");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/:id", getUser);

module.exports = { router };
