import Role from '../database/models/Roles';

export const post_roles = async (req, res) => {
    try {
        const newRole = await Role.create({
            name: req.body.name,
            description: req.body.description
        });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_roles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_roles_byid = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_roles = async (req, res) => {
    try {
        const [updated] = await Role.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Role not found' });
        const updatedRole = await Role.findByPk(req.params.id);
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_roles_byid = async (req, res) => {
    try {
        const deleted = await Role.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Role not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
