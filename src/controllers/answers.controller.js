import Answer from '../database/models/Answers';
import User from '../database/models/Users';
import Question from '../database/models/Questions';

export const post_answers = async (req, res) => {
    try {
        const { body, id_question, id_user } = req.body;

        // Verificar que la pregunta y el usuario existan
        const question = await Question.findByPk(id_question);
        const user = await User.findByPk(id_user);

        if (!question) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crear la nueva respuesta
        const newAnswer = await Answer.create({
            body,
            id_question,
            id_user
        });

        res.status(201).json({ message: 'Respuesta creada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_answers = async (req, res) => {
    try {
        const answers = await Answer.findAll();
        res.status(200).json(answers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_answers_byid = async (req, res) => {
    try {
        const answer = await Answer.findByPk(req.params.id);
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json(answer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_answers = async (req, res) => {
    try {
        const [updated] = await Answer.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Answer not found' });
        const updatedAnswer = await Answer.findByPk(req.params.id);
        res.status(200).json(updatedAnswer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_answers_byid = async (req, res) => {
    try {
        const deleted = await Answer.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Answer not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_answers_by_questionid = async (req, res) => {
    try {
        const answers = await Answer.findAll({
            where: { id_question: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'profile_img']
                }
            ]
        });

        // if (!answers.length) {
        //     return res.status(204).json({ message: 'No se encontraron respuestas para esta pregunta' });
        // }

        const result = answers.map(answer => ({
            id: answer.id,
            body: answer.body,
            id_question: answer.id_question,
            created_at: answer.created_at,
            user: {
                id: answer.User.id,
                first_name: answer.User.first_name,
                last_name: answer.User.last_name,
                profile_img: answer.User.profile_img
            }
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};