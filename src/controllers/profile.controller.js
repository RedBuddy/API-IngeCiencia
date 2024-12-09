import Profile from '../database/models/Profile';
import User from '../database/models/Users';
import UserDiscipline from '../database/models/UserDisciplines';
import Category from '../database/models/Categories';
import Role from '../database/models/Roles';
import Article from '../database/models/Articles';
import { Op } from 'sequelize';

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


export const get_user_card = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: { id },
            attributes: ['first_name', 'last_name', 'email', 'profile_img'],
            include: [
                {
                    model: Profile,
                    attributes: ['university', 'faculty', 'orcid', 'google_scholar_link', 'research_gate_link']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            profile_img: user.profile_img,
            university: user.Profile ? user.Profile.university : null,
            faculty: user.Profile ? user.Profile.faculty : null,
            orcid: user.Profile ? user.Profile.orcid : null,
            google_scholar_link: user.Profile ? user.Profile.google_scholar_link : null,
            research_gate_link: user.Profile ? user.Profile.research_gate_link : null
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const get_user_about = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: { id },
            attributes: [ 'first_name', 'last_name'],
            include: [
                {
                    model: Profile,
                    attributes: ['biography', 'experience']
                },
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

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = {
            first_name: user.first_name,
            last_name: user.last_name,
            biography: user.Profile ? user.Profile.biography : null,
            experience: user.Profile ? user.Profile.experience : null,
            disciplines: user.UserDisciplines.map(discipline => discipline.Category.category_name)
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_researchers_details = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'profile_img'],
            include: [
                {
                    model: Role,
                    where: {
                        role_name: ['autor', 'editor', 'admin']
                    },
                    attributes: []
                },
                {
                    model: Profile,
                    attributes: ['university', 'faculty', 'department']
                }
            ]
        });

        // if (!users.length) {
        //     return res.status(404).json({ message: 'Investigadores no encontrados' });
        // }

        const result = await Promise.all(users.map(async (user) => {
            const publicationsCount = await Article.count({
                where: { id_author: user.id }
            });

            return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_img: user.profile_img,
                university: user.Profile ? user.Profile.university : null,
                faculty: user.Profile ? user.Profile.faculty : null,
                department: user.Profile ? user.Profile.department : null,
                publications_count: publicationsCount
            };
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_admin_profile = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'profile_img'],
            include: [
                {
                    model: Role,
                    where: {
                        role_name: ['admin']
                    },
                    attributes: []
                },
                {
                    model: Profile,
                    attributes: ['university', 'faculty', 'department']
                }
            ]
        });

        // if (!users.length) {
        //     return res.status(404).json({ message: 'Investigadores no encontrados' });
        // }

        const result = await Promise.all(users.map(async (user) => {
            const publicationsCount = await Article.count({
                where: { id_author: user.id }
            });

            return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                profile_img: user.profile_img,
                university: user.Profile ? user.Profile.university : null,
                faculty: user.Profile ? user.Profile.faculty : null,
                department: user.Profile ? user.Profile.department : null,
                publications_count: publicationsCount
            };
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};