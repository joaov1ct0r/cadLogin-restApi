const User = require('../models/User');

let user = {
    database: [],

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

    register: async function (email, nome, idade, senha, callback) {
        const user = new User({
            email: email,
            nome: nome,
            idade: idade,
            senha: senha
        });

        try {
            const savedUser = await user.save();
            callback(savedUser);
        } catch (error) {
            throw error;
        }
        this.database.push({ email, nome, idade, senha });
    }
};

module.exports = user;
