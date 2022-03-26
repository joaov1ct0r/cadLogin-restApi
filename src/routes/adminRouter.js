import validateAdmin from '../controllers/adminController.js';

import express from 'express';

const router = express.Router();

router.get('/', validateAdmin);
