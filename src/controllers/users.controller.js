import User from '../database/models/Users';
import bcrypt from 'bcrypt';

export const post_users = async (req, res) => {
    try {
        const { username, email, password, first_name, last_name, orcid, profile_img_path, role_id, status } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            orcid,
            profile_img_path,
            role_id,
            status
        });
        res.status(201).json(newUser);
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

export const update_users = async (req, res) => {
    try {
        const { username, email, password, first_name, last_name, orcid, profile_img_path, role_id, status } = req.body;
        const updateData = { username, email, first_name, last_name, orcid, profile_img_path, role_id, status };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const [updated] = await User.update(updateData, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'User not found' });
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_users_byid = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
