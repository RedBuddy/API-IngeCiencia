import Resource from '../database/models/Resources';
import User from '../database/models/Users';

export const post_resources = async (req, res) => {
    try {
        const { title, description, url, id_user } = req.body;

        // Crear el nuevo recurso
        const newResource = await Resource.create({
            title,
            description,
            url,
            id_user
        });

        res.status(201).json(newResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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

export const update_resources = async (req, res) => {
    try {
        const [updated] = await Resource.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Recurso no encontrado' });
        const updatedResource = await Resource.findByPk(req.params.id);
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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