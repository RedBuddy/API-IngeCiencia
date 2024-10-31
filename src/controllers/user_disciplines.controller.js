import UserDisciplines from '../database/models/UserDisciplines';
import User from '../database/models/Users';
import Category from '../database/models/Categories';

export const post_user_disciplines = async (req, res) => {
    try {
        const newUserDiscipline = await UserDisciplines.create({
            id_user: req.body.id_user,
            id_category: req.body.id_category
        });
        res.status(201).json(newUserDiscipline);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_user_disciplines = async (req, res) => {
    try {
        const userDisciplines = await UserDisciplines.findAll({
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });
        res.status(200).json(userDisciplines);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_user_disciplines_byid = async (req, res) => {
    try {
        const userDiscipline = await UserDisciplines.findOne({
            where: { id_user: req.params.id },
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });
        if (!userDiscipline) return res.status(404).json({ message: 'User discipline not found' });
        res.status(200).json(userDiscipline);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_user_disciplines = async (req, res) => {
    try {
        const [updated] = await UserDisciplines.update(req.body, {
            where: { id_user: req.params.id, id_category: req.body.id_category }
        });
        if (!updated) return res.status(404).json({ message: 'User discipline not found' });
        const updatedUserDiscipline = await UserDisciplines.findOne({
            where: { id_user: req.params.id, id_category: req.body.id_category },
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });
        res.status(200).json(updatedUserDiscipline);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_user_disciplines_byid = async (req, res) => {
    try {
        const deleted = await UserDisciplines.destroy({
            where: { id_user: req.params.id, id_category: req.body.id_category }
        });
        if (!deleted) return res.status(404).json({ message: 'User discipline not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
