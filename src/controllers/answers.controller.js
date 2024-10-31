import Answer from '../database/models/Answers';
import { faker } from '@faker-js/faker';

export const post_answers = async (req, res) => {
    try {
        const newAnswer = await Answer.create({
            id_question: req.body.id_question, // Asegúrate de que este ID existe en la tabla de preguntas
            body: faker.lorem.paragraph(), // Genera un cuerpo de respuesta aleatorio
            id_user: req.body.id_user, // Asegúrate de que este ID existe en la tabla de usuarios
        });
        res.status(201).json(newAnswer);
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
