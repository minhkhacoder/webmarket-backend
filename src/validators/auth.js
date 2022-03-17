/** @format */

const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("phone").isString().withMessage("valid phone is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

exports.validateSigninRequest = [
  check("phone").isString().withMessage("valid phone is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};
