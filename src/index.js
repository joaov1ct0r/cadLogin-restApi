require('dotenv').config();

let express = require('express');

let bodyParser = require('body-parser');

let app = express();

app.listen(process.env.NODE_ENV_SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.NODE_ENV_SERVER_PORT}`);
});
