let express = require('express');

let router = express.Router();

let bodyParser = require('body-parser');

let controller = require('../controllers/controller');

router.post('/login', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { senha } = req.body;

    controller.login(email, senha, function (result) {
        res.send(result);
    });
});

router.post('/register', bodyParser.json(), (req, res) => {
    let { email } = req.body;

    let { nome } = req.body;

    let { idade } = req.body;

    let { senha } = req.body;

    controller.register(email, nome, idade, senha, function (result) {
        res.send(result);
    });
});

module.exports = router;
