const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Home, UserHomeJoins } = require("../../db/models");
const { check } = require("express-validator");
const { validateSignup, validateHome } = require("../../utils/validation");
const { Op } = require("sequelize");
const { singlePublicFileUpload } = require("../../awsS3");
const multer = require("multer");

const router = express.Router();

// in awsS3.js
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).single(nameOfKey);

// Sign up
router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  async (req, res) => {
    const { email, password, username, image } = req.body;
    let profileImageUrl;
    if (image) profileImageUrl = await singlePublicFileUpload(req.file);
    const user = await User.signup({
      email,
      username,
      password,
      profileImageUrl,
    });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);

// Add Home
router.post(
  "/:userId/ownedHomes",
  singleMulterUpload("image"),
  validateHome,
  async (req, res) => {
    let { userId } = req.params;
    let { homeName, image } = req.body;
    userId = parseInt(userId);

    let homeImg = `https://picsum.photos/id/${Math.floor(
      Math.random() * 1084
    )}/300`;
    if (image) {
      homeImg = await singlePublicFileUpload(req.file);
    }

    const newHome = await Home.create({
      homeName,
      ownerId: userId,
      imgUrl: homeImg,
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
  }
);

// Update Home
router.put(
  "/:userId/ownedHomes/:homeId",
  singleMulterUpload("image"),
  async (req, res) => {
    let { userId, homeId } = req.params;
    let { homeName, image } = req.body;

    let homeImg;
    if (image) {
      homeImg = await singlePublicFileUpload(req.file);
    }

    userId = parseInt(userId);
    const updatedHome = await Home.findOne({
      where: {
        [Op.and]: [{ id: homeId }, { ownerId: userId }],
      },
    });

    if (updatedHome) {
      updatedHome.homeName = homeName;
      if (homeImg) updatedHome.imgUrl = homeImg;
      updatedHome.save();
    }

    // const updatedHome = await home.update({
    //   homeName,
    //   ownerId: userId,
    //   imgUrl: homeImg,
    // });

    return res.json({ updatedHome });
  }
);

//Delete Home
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

// Enter Room

router.put("/:userId/ownedHomes/:homeId/rooms/:roomId", async (req, res) => {
  let { userId, roomId, homeId } = req.params;
  userId = parseInt(userId);
  roomId = parseInt(roomId);

  const owned = await Home.findByPk(homeId);
  let access = owned.ownerId === userId ? true : false;
  if (!access) {
    access = await UserHomeJoins.findOne({
      where: {
        [Op.and]: [{ homeId, homeId }, { userId: userId }],
      },
    });
  }
  let permission = access || owned;
  if (!permission) {
    const err = new Error("Forbidden");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Forbidden"];
    return next(err);
  }

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (permission && user) {
    user.currentRoomId = roomId;
    await user.save();
  }

  res.json({
    user,
  });
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
