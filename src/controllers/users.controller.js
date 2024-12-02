import User from '../database/models/Users';
import Role from '../database/models/Roles';
import bcrypt from 'bcrypt';
import multer from 'multer';

// Configurar multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const post_users = [
    upload.single('profile_img'), // Middleware para manejar la subida de la imagen de perfil
    async (req, res) => {
        try {
            const { username, email, password, first_name, last_name, orcid, role_id, status } = req.body;
            const profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido

            // Verificar si el username o email ya existen
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }

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
                orcid,
                profile_img, // Almacenar la imagen de perfil en la base de datos
                role_id,
                status
            });

            res.status(201).json({ id: newUser.id, message: 'Usuario creado exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

// Función para subir la imagen de perfil de un usuario existente
export const post_user_img = [
    upload.single('profile_img'), // Middleware para manejar la subida de la imagen de perfil
    async (req, res) => {
        try {
            const profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido

            if (!profile_img) {
                return res.status(400).json({ message: 'No se proporcionó una imagen' });
            }

            const [updated] = await User.update({ profile_img }, {
                where: { id: req.params.id }
            });

            if (!updated) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            // const updatedUser = await User.findByPk(req.params.id);
            res.status(202).json({ message: 'Imagen de perfil actualizada' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

// Función para obtener la imagen de perfil de un usuario
export const get_user_img = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['profile_img']
        });

        if (!user || !user.profile_img) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo de contenido según el formato de la imagen
        res.send(user.profile_img);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_users = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_users_byid = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_users = [
    upload.single('profile_img'), // Middleware para manejar la subida de la imagen de perfil
    async (req, res) => {
        try {
            const { first_name, last_name, email, current_password, new_password } = req.body;
            const profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Verificar la contraseña actual
            const isPasswordValid = await bcrypt.compare(current_password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Contraseña actual incorrecta' });
            }

            const updateData = {
                first_name,
                last_name
            };

            // Verificar si el nuevo email ya está en uso por otro usuario
            if (email && email !== user.email) {
                const existingEmail = await User.findOne({ where: { email } });
                if (existingEmail) {
                    return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
                }
                updateData.email = email;
            }

            if (new_password) {
                updateData.password = await bcrypt.hash(new_password, 10);
            }

            if (profile_img) {
                updateData.profile_img = profile_img;
            }

            const [updated] = await User.update(updateData, {
                where: { id: req.params.id }
            });

            if (!updated) {
                return res.status(404).json({ message: 'Error al actualizar usuario' });
            }

            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json({message: 'Usuario actualizado exitosamente'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];


export const delete_users_byid = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_authors = async (req, res) => {
    try {
        const authors = await User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'profile_img'],
            include: [{
                model: Role,
                attributes: [],
                where: {
                    role_name: ['autor', 'editor', 'admin']
                }
            }]
        });

        res.status(200).json(authors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};