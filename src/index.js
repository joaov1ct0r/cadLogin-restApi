import 'dotenv/config';

import userRouter from './routes/userRouter.js';

import adminRouter from './routes/adminRouter.js';

import bodyParser from 'body-parser';

import express from 'express';

import dbConnection from './config/db.js';

let app = express();

dbConnection();

app.use(bodyParser.json());

app.use('/usuario', userRouter);

app.use('/admin', adminRouter);

app.listen(process.env.NODE_ENV_SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.NODE_ENV_SERVER_PORT}`);
});
