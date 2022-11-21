const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Home, UserHomeJoins } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

// Add Home to User
router.post("/:userId/ownedHomes", async (req, res) => {
  let { userId } = req.params;
  let { homeName, imgUrl } = req.body;
  userId = parseInt(userId);

  const newHome = await Home.create({
    homeName,
    ownerId: userId,
    imgUrl,
  });

  if (!newHome) {
    const err = new Error("Error Creating Home");
    err.status = 404;
    throw err;
  } else {
    res.json({
      newHome,
    });
  }
});

// Get homes that user belongs to
router.get("/:userId/partHomes", async (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);

  const userPartHomes = await User.findOne({
    where: { id: userId },
    include: [
      {
        model: Home,
        where: {
          ownerId: {
            [Op.ne]: userId,
          },
        },
      },
    ],
  });

  return res.json({
    userPartHomes,
  });
});

// Get homes that user owns
router.get("/:userId/ownedHomes", async (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);

  const userOwnedHomes = await Home.findAll({
    where: { ownerId: userId },
  });

  return res.json(userOwnedHomes);
});

// update homes that user owns
router.put("/:userId/ownedHomes/:homeId", async (req, res) => {
  let { userId, homeId } = req.params;
  userId = parseInt(userId);

  const home = await Home.findOne({
    where: {
      [Op.and]: [{ id: homeId }, { ownerId: userId }],
    },
  });

  const updatedHome = await home.update({
    ...req.body,
  });

  return res.json({
    updatedHome,
  });
});

router.delete("/:userId/ownedHomes/:homeId", async (req, res) => {
  let { userId, homeId } = req.params;
  userId = parseInt(userId);

  const deleted = await Home.destroy({
    where: {
      [Op.and]: [{ id: homeId }, { ownerId: userId }],
    },
  });
  if (deleted) return res.json({ homeId });
});

// Enter Room

router.put("/:userId/ownedHomes/:homeId/rooms/:roomId", async (req, res) => {
  let { userId, roomId, homeId } = req.params;
  userId = parseInt(userId);
  roomId = parseInt(roomId);
  const access = await UserHomeJoins.findOne({
    where: {
      [Op.and]: [{ homeId, homeId }, { userId: userId }],
    },
  });

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (access && user) {
    user.currentRoomId = roomId;
    await user.save();
    res.json({
      user,
    });
  }
});

// Leave Room

router.put("/:userId/leaveRoom", async (req, res) => {
  let { userId, roomId, homeId } = req.params;
  userId = parseInt(userId);
  roomId = parseInt(roomId);

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (user) {
    user.currentRoomId = null;
    await user.save();
    res.json({
      user,
    });
  }
});

module.exports = router;
