import ResourceCoauthor from '../database/models/ResourceCoauthorsMap';

export const post_resource_coauthors = async (req, res) => {
    try {
        const newCoauthor = await ResourceCoauthor.create({
            id_resource: req.body.id_resource, // Asegúrate de que este ID existe en la tabla de recursos
            id_coauthor: req.body.id_coauthor, // Asegúrate de que este ID existe en la tabla de usuarios
        });
        res.status(201).json(newCoauthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resource_coauthors = async (req, res) => {
    try {
        const coauthors = await ResourceCoauthor.findAll();
        res.status(200).json(coauthors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resource_coauthors_byid = async (req, res) => {
    try {
        const coauthor = await ResourceCoauthor.findByPk(req.params.id);
        if (!coauthor) return res.status(404).json({ message: 'Coauthor not found' });
        res.status(200).json(coauthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_resource_coauthors = async (req, res) => {
    try {
        const [updated] = await ResourceCoauthor.update(req.body, { where: { id_resource: req.params.id_resource, id_coauthor: req.params.id_coauthor } });
        if (!updated) return res.status(404).json({ message: 'Coauthor not found' });
        const updatedCoauthor = await ResourceCoauthor.findOne({ where: { id_resource: req.params.id_resource, id_coauthor: req.params.id_coauthor } });
        res.status(200).json(updatedCoauthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_resource_coauthors_byid = async (req, res) => {
    try {
        const deleted = await ResourceCoauthor.destroy({ where: { id_resource: req.params.id_resource, id_coauthor: req.params.id_coauthor } });
        if (!deleted) return res.status(404).json({ message: 'Coauthor not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
