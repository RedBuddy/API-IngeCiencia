import User from '../database/models/Users';
import Role from '../database/models/Roles'; // Asegúrate de tener un modelo de Roles
import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../jwtconfig';

export const login_users = async (req, res) => {
    const { identifier, password } = req.body;

    // Validación de campos
    if (!identifier || !password) {
        return res.status(400).json({ message: 'Por favor ingresa el nombre de usuario/email y la contraseña' });
    }

    try {
        // Verificar si el identificador es un email o un nombre de usuario
        let user;
        if (identifier.includes('@')) {
            // Es un email
            user = await User.findOne({ where: { email: identifier }, include: Role });
        } else {
            // Es un nombre de usuario
            user = await User.findOne({ where: { username: identifier }, include: Role });
        }

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT y un refresh token con los datos del usuario
        const token = generateToken({ id: user.id, username: user.username, role_id: user.role_id });
        const refreshToken = generateRefreshToken({ id: user.id });

        res.json({ message: 'Autenticación exitosa', token, refreshToken });
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const refresh_token = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token es requerido' });
    }

    try {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findByPk(decoded.user_id, { include: Role });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const newAccessToken = generateToken({ id: user.id, username: user.username, role_id: user.role_id });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error al refrescar el token:', error);
        return res.status(401).json({ message: 'Refresh token inválido o expirado' });
    }
};