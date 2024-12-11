import Resource from '../database/models/Resources';
import User from '../database/models/Users';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const post_resources = [
    upload.single('pdf'), // Middleware para manejar la subida del archivo PDF
    async (req, res) => {
        try {
            const { title, description, resource_category, link, id_author } = req.body;
            const pdf = req.file ? req.file.buffer : null; // Obtener el archivo PDF subido

            // Crear el nuevo recurso
            const newResource = await Resource.create({
                title,
                description,
                resource_category,
                link,
                id_author,
                pdf // Almacenar el archivo PDF en la base de datos
            });

            res.status(201).json(newResource);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

export const get_resources = async (req, res) => {
    try {
        const resources = await Resource.findAll();
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resources_byid = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Recurso no encontrado' });
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_resources = [
    upload.single('pdf'), // Middleware para manejar la subida del archivo PDF
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, resource_category, link } = req.body;
            const pdf = req.file ? req.file.buffer : null; // Obtener el archivo PDF subido

            // Verificar si el recurso existe
            const resource = await Resource.findByPk(id);
            if (!resource) {
                return res.status(404).json({ message: 'Recurso no encontrado' });
            }

            // Actualizar el recurso
            await resource.update({
                title,
                description,
                resource_category,
                link,
                pdf: pdf || resource.pdf // Mantener el archivo PDF existente si no se proporciona uno nuevo
            });

            res.status(200).json(resource);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

export const delete_resources_byid = async (req, res) => {
    try {
        const deleted = await Resource.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Recurso no encontrado' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resource_author = async (req, res) => {
    try {
        const { id } = req.params;

        const resource = await Resource.findOne({
            where: { id },
            attributes: [],
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'profile_img']
                }
            ]
        });

        if (!resource) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        const author = resource.User;

        res.status(200).json({
            first_name: author.first_name,
            last_name: author.last_name,
            profile_img: author.profile_img
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};