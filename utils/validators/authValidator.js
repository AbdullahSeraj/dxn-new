const { check } = require("express-validator");
const validationMiddleware = require("../../middleware/validationMiddleware");

const SignUpValidator = [
  check("username").notEmpty().withMessage(""),
  validationMiddleware,
];
