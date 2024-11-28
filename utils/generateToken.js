import jwt from 'jsonwebtoken';

const secret = '12345'; // Cambia esto por una clave secreta segura

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        secret,
        {
            expiresIn: '1h', // El token expirará en 1 hora
        }
    );
};

export default generateToken;