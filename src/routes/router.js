let express = require('express');

let router = express.Router();

let bodyParser = require('body-parser');

let controller = require('../controllers/controller');

let user = [];

router.post('/login', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { senha } = req.body;

    controller.login(email, senha, function (result) {
        console.log(result);
    });
});

router.post('/register', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { nome } = req.body;

    let { idade } = req.body;

    let { senha } = req.body;

    user.push({ email, nome, idade, senha });

    res.send('Rota funcionando');
});
