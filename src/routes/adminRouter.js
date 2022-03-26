import validateAdmin from '../controllers/adminController.js';

import express from 'express';

const adminRouter = express.Router();

adminRouter.get('/', validateAdmin);

export default adminRouter;
