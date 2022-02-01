const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send('Acesso negado');

    try {
        const userVerified = jwt.verify(
            token,
            process.env.NODE_ENV_TOKEN_SECRET
        );
        next();
    } catch (error) {
        res.status(401).send('Acesso negado');
    }
};
