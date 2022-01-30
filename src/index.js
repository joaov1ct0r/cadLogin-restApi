require('dotenv').config();

let express = require('express');

let mongoose = require('mongoose');

let router = require('./routes/router');

let app = express();

mongoose.connect(
    process.env.NODE_ENV_DB_HOST,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    error => {
        if (error) {
            throw error;
        } else {
            console.log('Mongoose Conectado');
        }
    }
);

app.use('/api', router);

app.listen(process.env.NODE_ENV_SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.NODE_ENV_SERVER_PORT}`);
});
