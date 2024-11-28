import ResourceCoauthor from '../database/models/ResourceCoauthorsMap';
import Resource from '../database/models/Resources';
import User from '../database/models/Users';

// Asegúrate de que las asociaciones estén configuradas correctamente
ResourceCoauthor.belongsTo(Resource, { foreignKey: 'id_resource' });
ResourceCoauthor.belongsTo(User, { foreignKey: 'id_coauthor' });

export const post_resource_coauthors = async (req, res) => {
    try {
        // Verificar si ya existe una entrada con los mismos id_resource e id_coauthor
        const existingEntry = await ResourceCoauthor.findOne({
            where: {
                id_resource: req.body.id_resource,
                id_coauthor: req.body.id_coauthor
            }
        });

        if (existingEntry) {
            return res.status(409).json({ error: 'Duplicate entry: Resource coauthor already exists' });
        }

        // Crear una nueva entrada si no existe duplicado
        const newCoauthor = await ResourceCoauthor.create({
            id_resource: req.body.id_resource,
            id_coauthor: req.body.id_coauthor
        });

        res.status(201).json(newCoauthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resource_coauthors = async (req, res) => {
    try {
        const coauthors = await ResourceCoauthor.findAll({
            include: [
                { model: Resource, attributes: ['title'] },
                { model: User, attributes: ['username', 'email'] }
            ]
        });
        res.status(200).json(coauthors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resource_coauthors_byid = async (req, res) => {
    try {
        const coauthors = await ResourceCoauthor.findAll({
            where: { id_resource: req.params.id },
            include: [
                { model: Resource, attributes: ['title'] },
                { model: User, attributes: ['username', 'email'] }
            ]
        });

        const result = {
            id_resource: req.params.id,
            id_coauthors: coauthors.map(rc => rc.id_coauthor)
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_resource_coauthors = async (req, res) => {
    const { id_resource, id_coauthors } = req.body;

    try {
        // Eliminar todos los coautores actuales del recurso
        await ResourceCoauthor.destroy({
            where: { id_resource }
        });

        // Crear nuevas entradas para los coautores proporcionados
        const newResourceCoauthors = await Promise.all(
            id_coauthors.map(async (id_coauthor) => {
                return await ResourceCoauthor.create({
                    id_resource,
                    id_coauthor
                });
            })
        );

        // Obtener los coautores actualizados del recurso
        const updatedResourceCoauthors = await ResourceCoauthor.findAll({
            where: { id_resource },
            include: [
                { model: Resource, attributes: ['title'] },
                { model: User, attributes: ['username', 'email'] }
            ]
        });

        res.status(200).json(updatedResourceCoauthors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_resource_coauthors_byid = async (req, res) => {
    try {
        const deleted = await ResourceCoauthor.destroy({
            where: { id_resource: req.params.id, id_coauthor: req.body.id_coauthor }
        });
        if (!deleted) return res.status(404).json({ message: 'Resource coauthor not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
