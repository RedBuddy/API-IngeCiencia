import UserDiscipline from '../database/models/UserDisciplines';
import User from '../database/models/Users';
import Category from '../database/models/Categories';

// Asegúrate de que las asociaciones estén configuradas correctamente
UserDiscipline.belongsTo(User, { foreignKey: 'id_user' });
UserDiscipline.belongsTo(Category, { foreignKey: 'id_category' });

export const post_user_disciplines = async (req, res) => {
    try {
        // Verificar si ya existe una entrada con los mismos id_user e id_category
        const existingEntry = await UserDiscipline.findOne({
            where: {
                id_user: req.body.id_user,
                id_category: req.body.id_category
            }
        });

        if (existingEntry) {
            return res.status(409).json({ error: 'Duplicate entry: User discipline already exists' });
        }

        // Crear una nueva entrada si no existe duplicado
        const newUserDiscipline = await UserDiscipline.create({
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
        const userDisciplines = await UserDiscipline.findAll({
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
        const userDisciplines = await UserDiscipline.findAll({
            where: { id_user: req.params.id },
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        // if (!userDisciplines.length) return res.status(404).json({ message: 'User disciplines not found' });

        const result = {
            id_user: req.params.id,
            id_categories: userDisciplines.map(ud => ud.id_category)
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_user_disciplines = async (req, res) => {
    const { id_user, id_categories } = req.body;

    try {
        // Eliminar todas las disciplinas actuales del usuario
        await UserDiscipline.destroy({
            where: { id_user }
        });

        // Crear nuevas entradas para las disciplinas proporcionadas
        const newUserDisciplines = await Promise.all(
            id_categories.map(async (id_category) => {
                return await UserDiscipline.create({
                    id_user,
                    id_category
                });
            })
        );

        // Obtener las disciplinas actualizadas del usuario
        const updatedUserDisciplines = await UserDiscipline.findAll({
            where: { id_user },
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        res.status(200).json(updatedUserDisciplines);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_user_disciplines_byid = async (req, res) => {
    try {
        const deleted = await UserDiscipline.destroy({
            where: { id_user: req.params.id, id_category: req.body.id_category }
        });
        if (!deleted) return res.status(404).json({ message: 'User discipline not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
