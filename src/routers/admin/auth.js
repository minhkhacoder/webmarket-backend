const express = require('express');
const router = express.Router();
const auth = require('../../controllers/admin/auth');
const {validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');

router.post('/admin/signup', validateSignupRequest, isRequestValidated, auth.signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, auth.signin);

module.exports = router;

