let user = {
    database: [],

    login: function (email, senha, callback) {
        if (email === this.database.email && senha === this.database.senha) {
            callback('Login realizado com sucesso');
        } else {
            callback('Falha na autenticação');
        }
    },

    register: function (email, nome, idade, senha, callback) {
        this.database.push({ email, nome, idade, senha });

        callback('Cadastro realizado com sucesso');
    }
};
