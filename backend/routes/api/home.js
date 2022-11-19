const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Home } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/:homeId", async (req, res) => {
  let { homeId } = req.params;
  homeId = parseInt(homeId);

  const oneHome = await Home.findOne({
    where: { id: homeId },
  });
  return res.json({
    home: oneHome,
  });
});

module.exports = router;
