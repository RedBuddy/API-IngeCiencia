import jwt from 'jsonwebtoken';

// Clave secreta para firmar el token (debería estar en una variable de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret_key';

// Función para generar un token JWT
export const generateToken = (user) => {
    // Aquí puedes agregar cualquier otro dato relevante del usuario
    return jwt.sign({ user_id: user.id, username: user.username, role_id: user.role_id }, JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ user_id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '1d' });
};

// Función para verificar un token JWT
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};