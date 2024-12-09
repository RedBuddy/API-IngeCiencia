import QuestionCategoryMap from '../database/models/QuestionCategoriesMap';
import Question from '../database/models/Questions';
import Category from '../database/models/Categories';

// Asegúrate de que las asociaciones estén configuradas correctamente
QuestionCategoryMap.belongsTo(Question, { foreignKey: 'id_question' });
QuestionCategoryMap.belongsTo(Category, { foreignKey: 'id_category' });

export const post_question_categories = async (req, res) => {
    try {
        const { id_question, id_category } = req.body;

        // Verificar que la pregunta y la categoría existan
        const question = await Question.findByPk(id_question);
        const category = await Category.findByPk(id_category);

        if (!question || !category) {
            return res.status(404).json({ message: 'Question or Category not found' });
        }

        // Verificar si ya existe una entrada con los mismos id_question e id_category
        const existingEntry = await QuestionCategoryMap.findOne({
            where: {
                id_question,
                id_category
            }
        });

        if (existingEntry) {
            return res.status(409).json({ error: 'Duplicate entry: Question category already exists' });
        }

        // Crear una nueva entrada si no existe duplicado
        const newMapping = await QuestionCategoryMap.create({
            id_question,
            id_category
        });
        res.status(201).json(newMapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_question_categories = async (req, res) => {
    try {
        const mappings = await QuestionCategoryMap.findAll({
            include: [
                { model: Question, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });
        res.status(200).json(mappings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_question_categories_byid = async (req, res) => {
    try {
        const mappings = await QuestionCategoryMap.findAll({
            where: { id_question: req.params.id },
            include: [
                { model: Question, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        const result = {
            id_question: req.params.id,
            id_categories: mappings.map(qc => qc.id_category)
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_question_categories = async (req, res) => {
    const { id_question, id_categories } = req.body;

    try {
        // Eliminar todas las categorías actuales de la pregunta
        await QuestionCategoryMap.destroy({
            where: { id_question }
        });

        // Crear nuevas entradas para las categorías proporcionadas
        const newQuestionCategories = await Promise.all(
            id_categories.map(async (id_category) => {
                return await QuestionCategoryMap.create({
                    id_question,
                    id_category
                });
            })
        );

        // Obtener las categorías actualizadas de la pregunta
        const updatedQuestionCategories = await QuestionCategoryMap.findAll({
            where: { id_question },
            include: [
                { model: Question, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        res.status(200).json(updatedQuestionCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_question_categories_byid = async (req, res) => {
    try {
        const deleted = await QuestionCategoryMap.destroy({
            where: { id_question: req.params.id, id_category: req.body.id_category }
        });
        if (!deleted) return res.status(404).json({ message: 'Question category not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};