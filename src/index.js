require('dotenv').config();

let express = require('express');

let mysql = require('mysql2');

let router = require('./routes/router');

let app = express();

mysql.createConnection(
    {
        host: process.env.NODE_ENV_DB_HOST,
        user: process.env.NODE_ENV_DB_USER,
        password: process.env.NODE_ENV_DB_PASSWORD,
        database: process.env.NODE_ENV_DB_DB
    },
    error => {
        if (error) {
            throw error;
        } else {
            console.log('MySQL Conectado');
        }
    }
);

app.use('/api', router);

app.listen(process.env.NODE_ENV_SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.NODE_ENV_SERVER_PORT}`);
});
