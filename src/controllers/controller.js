const User = require('../models/User');

let user = {
    login: function (email, senha, callback) {
        if (
            email === this.database[0].email &&
            senha === this.database[0].senha
        ) {
            callback('Login realizado com sucesso');
        } else {
            callback('Falha na autenticação');
        }
    },

    register: async function (req, res) {
        const user = new User({
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade,
            senha: req.body.senha
        });

        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

module.exports = user;
