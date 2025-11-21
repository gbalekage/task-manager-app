const express = require("express");
const { createUser, login, getUser } = require("../controllers/authController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/:id", getUser);

router.get("/me", auth, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

module.exports = router;
