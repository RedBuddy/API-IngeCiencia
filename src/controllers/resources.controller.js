import Resource from '../database/models/Resources';

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
