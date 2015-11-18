var express = require('express');
var router = express.Router();
var userController = require('../app/controllers/users')

/* GET users listing. */
router.post('/', userController.createUser);

module.exports = router;
