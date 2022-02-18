let Joi = require('@hapi/joi');

const registerValidate = data => {
    const schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        nome: Joi.string().required().min(10).max(100),
        idade: Joi.date().required(),
        senha: Joi.string().required().min(8).max(100)
    });
};
