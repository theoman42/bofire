const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, UserHomeJoins, Home } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { validateLogin } = require("../../utils/validation");

router.post("/", validateLogin, async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.login({ username, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }
  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

router.get("/", restoreUser, async (req, res) => {
  const { user } = req;
  if (user) {
    user.currentRoomId = null;
    await user.save();
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
