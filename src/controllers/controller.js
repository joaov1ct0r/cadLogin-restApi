const User = require('../models/User');

const bcrypt = require('bcryptjs');

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
        let selectedUser = await User.findOne({ email: req.body.email });

        if (selectedUser) return res.status(400).send('Email ja cadastrado');
        const user = new User({
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade,
            senha: bcrypt.hashSync(req.body.senha)
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
