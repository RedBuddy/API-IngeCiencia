import Profile from '../database/models/Profile';
import User from '../database/models/Users';

export const post_profile = async (req, res) => {
    try {
        const { id_user, university, faculty, department, orcid, biography, experience, google_scholar_link, research_gate_link } = req.body;

        // Crear el nuevo perfil
        const newProfile = await Profile.create({
            id_user,
            university: university || null,
            faculty: faculty || null,
            department: department || null,
            orcid: orcid || null,
            biography: biography || null,
            experience: experience || null,
            google_scholar_link: google_scholar_link || null,
            research_gate_link: research_gate_link || null
        });

        res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_profiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll({ });
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
        const profile = await Profile.findOne({ where: { id_user: req.params.id } });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        await Profile.update(req.body, {
            where: { id_user: req.params.id }
        });

        const updatedProfile = await Profile.findOne({
            where: { id_user: req.params.id },
            include: User
        });
        res.status(200).json({ message: 'Profile updated successfully' });
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
