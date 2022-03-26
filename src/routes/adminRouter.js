import validateAdmin from '../controllers/adminController';

const express = require('express');

const router = express.Router();

router.get('/', validateAdmin);
