const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.user.admin) {
        res.send('Dados do admin');
    } else {
        res.status(401).send('Acesso negado');
    }
});
