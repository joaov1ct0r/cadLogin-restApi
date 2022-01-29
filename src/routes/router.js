let express = require('express');

let router = express.Router();

let bodyParser = require('body-parser');

let user = [];

router.post('/login', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { senha } = req.body;

    if (email === user[0].email && senha === user[0].senha) {
        res.send('Rota funcionando');
    }
});

router.post('/register', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { nome } = req.body;

    let { idade } = req.body;

    let { senha } = req.body;

    user.push({ email, nome, idade, senha });

    res.send('Rota funcionando');
});
