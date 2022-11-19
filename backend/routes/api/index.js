const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const homesRouter = require("./home.js");

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

const { restoreUser } = require("../../utils/auth.js");
const { use } = require("./session.js");

router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/homes", homesRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
