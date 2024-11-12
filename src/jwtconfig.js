import jwt from 'jsonwebtoken';
import RefreshToken from './database/models/RefreshToken';

// Clave secreta para firmar el token (debería estar en una variable de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret_key';

// Función para generar un token JWT
export const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '2m' });
};

// Función para generar un refresh token
export const generateRefreshToken = async (user) => {
    const token = jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: '24h' });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    await RefreshToken.create({
        token,
        id_user: user.user_id,
        expires_at: expiresAt,
    });

    return token;
};

// Función para verificar un token JWT
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

// Función para verificar un refresh token
export const verifyRefreshToken = async (token) => {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const storedToken = await RefreshToken.findOne({ where: { token, isValid: true } });

    if (!storedToken) {
        throw new Error('Refresh token inválido o expirado');
    }

    return decoded;
};

// Función para invalidar un refresh token
export const invalidateRefreshToken = async (token) => {
    await RefreshToken.update({ isValid: false }, { where: { token } });
};