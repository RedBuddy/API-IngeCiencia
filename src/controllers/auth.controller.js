import User from '../database/models/Users';
import Role from '../database/models/Roles'; // Asegúrate de tener un modelo de Roles
import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken, verifyRefreshToken, invalidateRefreshToken } from '../jwtconfig';
import crypto from 'crypto';
import VerifyToken from '../database/models/VerifyToken';
import { sendVerificationEmail } from '../utils/email';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const login_verify_bypass = async (req, res) => {
    const { identifier, password } = req.body;

    // Validación de campos
    if (!identifier || !password) {
        return res.status(400).json({ message: 'Ingresa el Usuario / Email y la contraseña' });
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
        const token = generateToken({ user_id: user.id, username: user.username, role: user.Role.role_name });
        const refreshToken = await generateRefreshToken({ user_id: user.id });

        res.json({ message: 'Autenticación exitosa', token, refreshToken });
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const login_users = async (req, res) => {
    const { identifier, password } = req.body;

    // Validación de campos
    if (!identifier || !password) {
        return res.status(400).json({ message: 'Ingresa el Usuario / Email y la contraseña' });
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

        // Verificar si el usuario ha confirmado su correo electrónico
        if (!user.verified) {
            return res.status(403).json({ message: 'Verifica tu correo electrónico antes de iniciar sesión' });
        }

        // Verificar si el estado del usuario no es inactive
        if (user.status === 'inactive') {
            return res.status(401).json({ message: 'Tu cuenta está inactiva. Contacta al soporte.' });
        }

        // Generar un token JWT y un refresh token con los datos del usuario
        const token = generateToken({ user_id: user.id, username: user.username, role: user.Role.role_name });
        const refreshToken = await generateRefreshToken({ user_id: user.id });

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
        const decoded = await verifyRefreshToken(refreshToken);
        const user = await User.findByPk(decoded.user_id, { include: Role });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Invalidar el refresh token anterior
        await invalidateRefreshToken(refreshToken);

        // Generar nuevos tokens
        const newAccessToken = generateToken({ user_id: user.id, username: user.username, role: user.Role.role_name });
        const newRefreshToken = await generateRefreshToken({ user_id: user.id });

        res.json({ token: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        console.error('Error al refrescar el token:', error);
        return res.status(401).json({ message: 'Refresh token inválido o expirado' });
    }
};

export const register_user = [
    upload.single('profile_img'), // Middleware para manejar la subida de la imagen de perfil
    async (req, res) => {
        try {
            const { username, email, password, first_name, last_name } = req.body;
            const profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido


            // Verificar si el username ya existe
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }

            // Verificar si el correo electrónico ya está en uso
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                first_name,
                last_name,
                profile_img // Almacenar la imagen de perfil en la base de datos
            });

            // Generar el token de verificación
            const token = crypto.randomBytes(32).toString('hex');
            const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

            // Guardar el token en la base de datos
            await VerifyToken.create({
                id_user: newUser.id,
                token,
                expires_at
            });

            // Enviar el correo electrónico de verificación
            await sendVerificationEmail(newUser.email, token);

            res.status(201).json({message: 'Usuario creado exitosamente. Por favor, verifica tu correo electrónico.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

export const verify_email = async (req, res) => {
    try {
        const { token } = req.query;

        // Buscar el token en la base de datos
        const verifyToken = await VerifyToken.findOne({ where: { token } });

        if (!verifyToken) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        // Verificar si el token ha expirado
        if (verifyToken.expires_at < new Date()) {
            return res.status(410).json({ message: 'Token expirado' });
        }

        // Verificar si el token ya ha sido usado
        if (verifyToken.isValid) {
            return res.status(410).json({ message: 'El token ya ha sido usado' });
        }

        // Activar la cuenta del usuario
        await User.update({ verified: true }, { where: { id: verifyToken.id_user } });

        // Marcar el token como usado
        await verifyToken.update({ isValid: true });

        res.status(200).json({ message: 'Correo electrónico verificado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const resend_verification_email = async (req, res) => {
    try {
        const { email } = req.body;

        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el usuario ya está verificado
        if (user.verified) {
            return res.status(409).json({ message: 'El usuario ya está verificado' });
        }

        // Generar un nuevo token de verificación
        const token = crypto.randomBytes(32).toString('hex');
        const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

        // Guardar el nuevo token en la base de datos
        await VerifyToken.create({
            id_user: user.id,
            token,
            expires_at
        });

        // Enviar el correo electrónico de verificación
        await sendVerificationEmail(user.email, token);

        res.status(200).json({ message: 'Correo de verificación reenviado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};