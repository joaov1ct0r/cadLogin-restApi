let admin = {
    validateAdmin(req, res) {
        if (req.user.admin) {
            res.send('Dados do admin');
        } else {
            res.status(401).send('Acesso negado');
        }
    }
};

module.exports = admin;
