var express = require('express');
var router = express.Router();
var userHelper = require('../Controller/User/UserHelper');

/* POST users login.register */
router.post('/login', userHelper.userLogin);
router.post('/register', userHelper.userRegister);

module.exports = router;
