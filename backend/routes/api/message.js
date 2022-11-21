const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Message, User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");

router.get("/room/:roomId", async (req, res) => {
  let { roomId } = req.params;
  roomId = parseInt(roomId);

  const messages = await Message.findAll({
    where: {
      roomId,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: User,
      attributes: ["username"],
    },
  });

  res.json({ messages, type: "room", id: roomId });
});

router.post("/room/:roomId", async (req, res) => {
  let { roomId } = req.params;
  let { msg, userId } = req.body;
  roomId = parseInt(roomId);

  const newMessage = await Message.create({
    userId,
    roomId,
    dmId: null,
    messageBody: msg,
  });

  const message = await Message.findOne({
    where: {
      id: newMessage.id,
    },
    include: {
      model: User,
      attributes: ["username"],
    },
  });

  res.json({ message, type: "room", id: roomId });
});

router.get("/dm/:dmId", async (req, res) => {
  let { dmId } = req.params;
  dmId = parseInt(dmId);

  const messages = await Message.findAll({
    where: {
      dmId,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: User,
      attributes: ["username"],
    },
  });

  res.json({ messages, type: "dm", id: dmId });
});

module.exports = router;
