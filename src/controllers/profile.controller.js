import Profile from '../database/models/Profile';
import User from '../database/models/Users';

export const post_profile = async (req, res) => {
    try {
        const { id_user, biography, experience } = req.body;

        // Crear el nuevo perfil
        const newProfile = await Profile.create({
            id_user,
            biography,
            experience
        });

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_profiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll({ include: User });
        res.status(200).json(profiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_profile_byid = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            where: { id_user: req.params.id },
            include: User
        });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_profile = async (req, res) => {
    try {
        const [updated] = await Profile.update(req.body, { where: { id_user: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Profile not found' });
        const updatedProfile = await Profile.findOne({
            where: { id_user: req.params.id },
            include: User
        });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_profile_byid = async (req, res) => {
    try {
        const deleted = await Profile.destroy({ where: { id_user: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Profile not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
