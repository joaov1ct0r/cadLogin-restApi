const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send('Acesso negado');
};
