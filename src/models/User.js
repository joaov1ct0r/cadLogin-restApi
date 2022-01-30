const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, minlength: 10, maxlength: 100 },
    nome: { type: String, required: true, minlength: 10, maxlength: 100 },
    idade: { type: Number, required: true, minlength: 1, maxlength: 2 },
    senha: { type: String, required: true, minlength: 8, maxlength: 100 }
});

module.exports = mongoose.model('User', userSchema);
