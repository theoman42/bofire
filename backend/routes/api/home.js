const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Home, Room } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { validateRoom } = require("../../utils/validation");

const router = express.Router();

router.get("/:homeId", async (req, res) => {
  let { homeId } = req.params;
  homeId = parseInt(homeId);

  const oneHome = await Home.findOne({
    where: { id: homeId },
    include: "rooms",
  });

  if (!oneHome) {
    const err = new Error("No Home Found");
    err.status = 404;
    err.title = "No Home Found";
    err.errors = ["No Home Found"];
    return next(err);
  }

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

  if (!home) {
    const err = new Error("No Home Found");
    err.status = 404;
    err.title = "No Home Found";
    err.errors = ["No Home Found"];
    return next(err);
  }

  if (userId !== home.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Forbidden"];
    return next(err);
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

  if (!allRooms) {
    const err = new Error("No Room Found");
    err.status = 404;
    err.title = "No Room Found";
    err.errors = ["No Room Found"];
    return next(err);
  }

  return res.json({
    allRooms,
  });
});

router.post("/:homeId/rooms", validateRoom, async (req, res) => {
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
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Forbidden"];
    return next(err);
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

router.put("/:homeId/rooms/:roomId", validateRoom, async (req, res) => {
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
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Forbidden"];
    return next(err);
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
