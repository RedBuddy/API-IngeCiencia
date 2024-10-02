import { getcon, query } from "../database";
import bcrypt from 'bcryptjs';
import { generateToken } from '../jwtconfig';

// Autenticar usuario y generar un token JWT
export const login_users = async (req, res) => {
    const { identifier, password } = req.body; // Cambiamos email por identifier (puede ser email o username)

    // Validación de campos
    if (!identifier || !password) {
        return res.status(400).json({ message: 'Por favor ingresa el nombre de usuario/email y la contraseña' });
    }

    try {
        const connection = await getcon();

        // Verificar si el identificador es un email o un nombre de usuario
        let queryUser;
        if (identifier.includes('@')) {
            // Es un email
            queryUser = query.select_users_byemail;
        } else {
            // Es un nombre de usuario
            queryUser = query.select_users_byusername;
        }

        // Ejecutar la consulta adecuada
        const [user] = await connection.execute(queryUser, [identifier]);

        // Verificar si el usuario existe
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const foundUser = user[0];

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT con los datos del usuario
        const token = generateToken(foundUser);

        res.json({ message: 'Autenticación exitosa', token });
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


// Obtener todos los usuarios
export const get_users = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_users);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error); // Registra el error
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo usuario
export const post_users = async (req, res) => {
    const { Username, Email, Password, First_name, Last_name, Profile_img_path } = req.body;

    // Validación de campos
    if (!Username || !Email || !Password || !First_name || !Last_name || !Profile_img_path) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_users, [
            Username, Email, hashedPassword, First_name, Last_name, Profile_img_path
        ]);

        const userId = result.insertId;
        res.status(201).json({ id: userId }); // Establece el código de estado a 201 Created
    } catch (error) {
        console.error('Error al insertar usuario:', error); // Registra el error
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
};

// Actualizar usuario por ID
export const update_users = async (req, res) => {
    const { Username, Email, First_name, Last_name, Profile_img_path } = req.body;
    const { Id } = req.params;

    // Validación de campos
    if (!Username || !Email || !First_name || !Last_name || !Profile_img_path) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();

        // Verificar si el usuario existe antes de actualizar
        const [user] = await connection.execute(query.select_users_byid, [Id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await connection.execute(query.update_users_byid, [
            Username, Email, First_name, Last_name, Profile_img_path, Id,
        ]);

        res.json({ message: 'Usuario actualizado', user: { Username, Email, First_name, Last_name, Profile_img_path } });
    } catch (error) {
        console.error('Error al actualizar usuario:', error); // Registra el error
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar usuario por ID
export const delete_users_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();

        // Verificar si el usuario existe
        const [user] = await connection.execute(query.select_users_byid, [Id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si existe, proceder a eliminar
        await connection.execute(query.delete_users_byid, [Id]);
        res.sendStatus(204); // No Content
    } catch (error) {
        console.error('Error al eliminar usuario:', error); // Registra el error
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener usuario por ID
export const get_users_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_users_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error); // Registra el error
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};