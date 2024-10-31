import Question from '../database/models/Questions';
import { faker } from '@faker-js/faker';

export const post_questions = async (req, res) => {
    try {
        const newQuestion = await Question.create({
            title: faker.lorem.sentence(), // Genera un título aleatorio
            body: faker.lorem.paragraphs(3), // Genera un cuerpo de pregunta aleatorio
            id_user: req.body.id_user, // Asegúrate de que este ID existe en la tabla de usuarios
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
