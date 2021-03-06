/** @format */

const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");

router.post("/signup", validateSignupRequest, isRequestValidated, user.signup);
router.post("/signin", validateSigninRequest, isRequestValidated, user.signin);

module.exports = router;
