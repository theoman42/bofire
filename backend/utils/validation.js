// backend/utils/validation.js
const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateLogin = [
  check("username")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid username"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

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

const validateHome = [
  check("homeName")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Your Home name needs to be longer!"),
  handleValidationErrors,
];

const validateRoom = [
  check("roomName")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Your Room name needs to be longer!"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateRoom,
  validateSignup,
  validateHome,
};
