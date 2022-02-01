const express = require('express');

const router = express.Router();

let adminController = require('../controllers/adminController');

router.get('/', adminController);
