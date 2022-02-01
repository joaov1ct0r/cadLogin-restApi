let express = require('express');

let router = express.Router();

let authController = require('../controllers/authController');

let controller = require('../controllers/userController');

router.post('/login', authController, controller.login);

router.post('/register', controller.register);

module.exports = router;
