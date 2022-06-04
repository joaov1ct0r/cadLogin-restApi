import { login, register } from '../controllers/userController.js';

import express from 'express';

let router = express.Router();

router.post('/login', login);

router.post('/register', register);

export default router;
