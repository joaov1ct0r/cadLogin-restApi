import User from '../models/User.js';

import { registerValidate, loginValidate } from './validateData.js';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { error } = loginValidate(req.body);

    if (error) {
        return res.status(400).send('Falha na autenticação');
    }
    let selectedUser = await User.findOne({ email: req.body.email });

    if (!selectedUser) return res.status(400).send('Falha na autenticação');

    let passwordCompare = bcrypt.compareSync(
        req.body.password,
        selectedUser.password
    );

    if (!passwordCompare) return res.status(400).send('Falha na autenticação');

    const token = jwt.sign(
        { id: selectedUser.id, admin: selectedUser.admin },
        process.env.NODE_ENV_TOKEN_SECRET
    );
    res.header('auth-token', token);

    res.send('Login realizado com sucesso');
};

const register = async (req, res) => {
    let { error } = registerValidate(req.body);

    if (error) {
        return res.status(400).send('Falha no cadastramento');
    }
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

        if (!savedUser) return res.status(400).send('Falha no cadastramento');

        res.send(savedUser);
    } catch (error) {
        throw error;
    }
};

export { login, register };
