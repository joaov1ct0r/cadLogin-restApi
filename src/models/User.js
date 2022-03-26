import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, minlength: 10, maxlength: 100 },
    nome: { type: String, required: true, minlength: 10, maxlength: 100 },
    idade: { type: Number, required: true, minlength: 1, maxlength: 2 },
    senha: { type: String, required: true, minlength: 8, maxlength: 100 },
    admin: { type: Boolean, default: false }
});

export default model('User', userSchema);
