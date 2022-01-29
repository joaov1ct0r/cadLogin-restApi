require('dotenv').config();

let express = require('express');

let app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});
