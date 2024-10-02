import jwt from 'jsonwebtoken';

// Clave secreta para firmar el token (debería estar en una variable de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Función para generar un token JWT
export const generateToken = (user) => {
    // Aquí puedes agregar cualquier otro dato relevante del usuario
    return jwt.sign({ id: user.id, username: user.username, role_id: user.role_id }, JWT_SECRET, { expiresIn: '1h' });
};

// Función para verificar un token JWT
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
