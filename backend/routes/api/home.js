const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Home, Room } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/:homeId", async (req, res) => {
  let { homeId } = req.params;
  homeId = parseInt(homeId);

  const oneHome = await Home.findOne({
    where: { id: homeId },
    include: "rooms",
  });
  return res.json({
    home: oneHome,
  });
});

//Delete Rooms

router.delete("/:homeId/rooms/:roomId/:userId", async (req, res) => {
  let { userId, homeId, roomId } = req.params;
  userId = parseInt(userId);

  const home = await Home.findOne({
    where: {
      id: homeId,
    },
  });

  if (userId !== home.ownerId) {
    const err = new Error("Forbidden");
    err.status = 404;
    throw err;
  }

  const deleted = await Room.destroy({
    where: {
      id: roomId,
    },
  });

  if (deleted) return res.json({ roomId });
});

//Get All Rooms for homeId

router.get("/:homeId/rooms", async (req, res) => {
  let { homeId } = req.params;
  homeId = parseInt(homeId);

  const allRooms = await Room.findAll({
    where: { homeId },
  });
  return res.json({
    allRooms,
  });
});

router.post("/:homeId/rooms", async (req, res) => {
  let { homeId } = req.params;
  let { roomName, caption, userId } = req.body;
  userId = parseInt(userId);

  const home = await Home.findOne({
    where: {
      id: homeId,
    },
  });

  if (userId !== home.ownerId) {
    const err = new Error("Forbidden");
    err.status = 404;
    throw err;
  }

  const newRoom = await Room.create({
    roomName,
    homeId,
    caption,
  });

  if (!newRoom) {
    const err = new Error("Error Creating Home");
    err.status = 404;
    throw err;
  } else {
    res.json({
      newRoom,
    });
  }
});

router.put("/:homeId/rooms/:roomId", async (req, res) => {
  let { homeId, roomId } = req.params;
  let { roomName, caption, userId } = req.body;
  userId = parseInt(userId);
  homeId = parseInt(homeId);
  roomId = parseInt(roomId);

  const home = await Home.findOne({
    where: {
      id: homeId,
    },
  });

  if (userId !== home.ownerId) {
    const err = new Error("Forbidden");
    err.status = 404;
    throw err;
  }

  const room = await Room.findOne({
    where: {
      id: roomId,
    },
  });

  const updatedRoom = await room.update({
    roomName,
    homeId,
    caption,
  });

  if (!updatedRoom) {
    const err = new Error("Error Creating Home");
    err.status = 404;
    throw err;
  } else {
    res.json({
      updatedRoom,
    });
  }
});

module.exports = router;
