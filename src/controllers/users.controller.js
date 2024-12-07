import User from '../database/models/Users';
import Role from '../database/models/Roles';
import UserDiscipline from '../database/models/UserDisciplines';
import Article from '../database/models/Articles';
import Category from '../database/models/Categories';
// import Profile from '../database/models/Profile';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { Op } from 'sequelize';

// Configurar multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const post_users = [
    upload.single('profile_img'), // Middleware para manejar la subida de la imagen de perfil
    async (req, res) => {
        try {
            const { username, email, password, first_name, last_name, role_id, status } = req.body;
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
            const { id } = req.params;
            const { username, email, first_name, last_name, role_id, status, new_password } = req.body;
            const profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verificar la contraseña actual
            // const isMatch = await bcrypt.compare(current_password, user.password);
            // if (!isMatch) {
            //     return res.status(400).json({ message: 'Current password is incorrect' });
            // }

            // Verificar si el correo electrónico ya existe en otro usuario
            if (email && email !== user.email) {
                const existingEmail = await User.findOne({ where: { email } });
                if (existingEmail) {
                    return res.status(400).json({ message: 'El correo electrónico ya está en uso por otro usuario' });
                }
            }

            // Verificar si se proporciona una nueva contraseña
            let updatedFields = {
                username,
                email: email || user.email, // Mantener el correo electrónico actual si no se proporciona uno nuevo
                first_name,
                last_name,
                role_id,
                status,
                profile_img: profile_img || user.profile_img // Mantener la imagen de perfil actual si no se proporciona una nueva
            };

            if (new_password) {
                const hashedPassword = await bcrypt.hash(new_password, 10);
                updatedFields.password = hashedPassword;
            }

            await user.update(updatedFields);

            res.status(200).json({ message: 'User updated successfully', user });
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


export const get_user_details = async (req, res) => {
    try {
        const searchString = req.params.searchString;

        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.like]: `%${searchString}%` } },
                    { last_name: { [Op.like]: `%${searchString}%` } }
                ]
            },
            attributes: ['id', 'first_name', 'last_name', 'profile_img'],
            include: [
                {
                    model: UserDiscipline,
                    attributes: ['id_category'],
                    include: {
                        model: Category,
                        attributes: ['category_name']
                    }
                }
            ]
        });

        if (!users.length) {
            return res.status(404).json({ message: 'Users not found' });
        }

        const result = await Promise.all(users.map(async (user) => {
            const publicationsCount = await Article.count({
                where: { id_author: user.id }
            });

            return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_img: user.profile_img,
                user_disciplines: user.UserDisciplines.map(discipline => discipline.Category.category_name),
                publications_count: publicationsCount
            };
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const update_user_by_id = [
    upload.single('profile_img'), // Middleware para manejar la subida de la imagen de perfil
    async (req, res) => {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, current_password, new_password } = req.body;
            const profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verificar la contraseña actual
            const isMatch = await bcrypt.compare(current_password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
            }

            // Verificar si el correo electrónico ya existe en otro usuario
            if (email && email !== user.email) {
                const existingEmail = await User.findOne({ where: { email } });
                if (existingEmail) {
                    return res.status(400).json({ message: 'El correo electrónico ya está en uso por otro usuario' });
                }
            }

            // Verificar si se proporciona una nueva contraseña
            let updatedFields = {
                first_name,
                last_name,
                email: email || user.email, // Mantener el correo electrónico actual si no se proporciona uno nuevo
                profile_img: profile_img || user.profile_img // Mantener la imagen de perfil actual si no se proporciona una nueva
            };

            if (new_password) {
                const hashedPassword = await bcrypt.hash(new_password, 10);
                updatedFields.password = hashedPassword;
            }

            await user.update(updatedFields);

            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];