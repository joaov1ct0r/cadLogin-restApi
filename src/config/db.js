import mongoose from 'mongoose';

const dbConnection = mongoose.connect(
    process.env.NODE_ENV_DB_HOST,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    error => {
        if (error) {
            throw error;
        } else {
            console.log('Mongoose Conectado');
        }
    }
);

export default dbConnection;
