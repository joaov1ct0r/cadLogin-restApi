const User = require('../models/User');

const bcrypt = require('bcryptjs');

let user = {
    login: async function (req, res) {
        let selectedUser = await User.findOne({ email: req.body.email });

        if (!selectedUser) return res.status(400).send('Falha na autenticação');

        let passwordCompare = bcrypt.compareSync(
            req.body.password,
            selectedUser.password
        );

        if (!passwordCompare)
            return res.status(400).send('Falha na autenticação');

        return res.send('Login realizado com sucesso');
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
