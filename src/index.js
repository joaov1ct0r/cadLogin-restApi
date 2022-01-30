require('dotenv').config();

let express = require('express');

let mysql = require('mysql2');

let router = require('./routes/router');

let app = express();

app.use('/api', router);

app.listen(process.env.NODE_ENV_SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.NODE_ENV_SERVER_PORT}`);
});
