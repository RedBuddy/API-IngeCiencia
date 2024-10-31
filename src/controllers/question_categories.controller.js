import QuestionCategoryMap from '../database/models/QuestionCategoriesMap';

export const post_question_categories = async (req, res) => {
    try {
        const newMap = await QuestionCategoryMap.create({
            id_question: req.body.id_question, // Asegúrate de que este ID existe en la tabla de preguntas
            id_category: req.body.id_category, // Asegúrate de que este ID existe en la tabla de categorías
        });
        res.status(201).json(newMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_question_categories = async (req, res) => {
    try {
        const maps = await QuestionCategoryMap.findAll();
        res.status(200).json(maps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_question_categories_byid = async (req, res) => {
    try {
        const map = await QuestionCategoryMap.findByPk(req.params.id);
        if (!map) return res.status(404).json({ message: 'Mapping not found' });
        res.status(200).json(map);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_question_categories = async (req, res) => {
    try {
        const [updated] = await QuestionCategoryMap.update(req.body, { where: { id_question: req.params.id_question, id_category: req.params.id_category } });
        if (!updated) return res.status(404).json({ message: 'Mapping not found' });
        const updatedMap = await QuestionCategoryMap.findOne({ where: { id_question: req.params.id_question, id_category: req.params.id_category } });
        res.status(200).json(updatedMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_question_categories_byid = async (req, res) => {
    try {
        const deleted = await QuestionCategoryMap.destroy({ where: { id_question: req.params.id_question, id_category: req.params.id_category } });
        if (!deleted) return res.status(404).json({ message: 'Mapping not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
