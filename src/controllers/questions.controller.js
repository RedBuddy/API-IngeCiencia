import Question from '../database/models/Questions';
import User from '../database/models/Users';

export const post_questions = async (req, res) => {
    try {
        const { title, body, id_user } = req.body;

        // Crear la nueva pregunta
        const newQuestion = await Question.create({
            title,
            body,
            id_user 
        });

        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_questions = async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_questions_byid = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_questions = async (req, res) => {
    try {
        const [updated] = await Question.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Question not found' });
        const updatedQuestion = await Question.findByPk(req.params.id);
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_questions_byid = async (req, res) => {
    try {
        const deleted = await Question.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Question not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_question_author = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findOne({
            where: { id },
            attributes: [],
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'profile_img']
                }
            ]
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const author = question.User;

        res.status(200).json({
            first_name: author.first_name,
            last_name: author.last_name,
            profile_img: author.profile_img
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
