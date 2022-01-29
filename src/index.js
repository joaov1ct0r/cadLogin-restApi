require('dotenv').config();

let express = require('express');

let app = express();

let user = [];

app.post('/login', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { senha } = req.body;

    if (email === user[0].email && senha === user[0].senha) {
        res.send('Rota funcionando');
    }
});

app.post('/register', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { nome } = req.body;

    let { idade } = req.body;

    let { senha } = req.body;

    user.push({ email, nome, idade, senha });

    res.send('Rota funcionando');
});

app.listen(process.env.NODE_ENV_SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.NODE_ENV_SERVER_PORT}`);
});
