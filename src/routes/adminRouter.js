import validateAdmin from '../controllers/adminController';

import express from 'express';

const router = express.Router();

router.get('/', validateAdmin);
