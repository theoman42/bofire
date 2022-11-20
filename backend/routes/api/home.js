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

module.exports = router;
