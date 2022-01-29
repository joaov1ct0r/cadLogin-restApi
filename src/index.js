require('dotenv').config({ path: '../.env' });

let express = require('express');

let app = express();

app.listen(process.env.PORT, () => {
    console.log('Server running');
});
