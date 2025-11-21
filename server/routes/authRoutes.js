const express = require("express");
const { createUser, login, getUser } = require("../controllers/authController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/user/:id", getUser);

module.exports = router;
