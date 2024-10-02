import { getcon, query } from "../database";

// Obtener todas las respuestas
export const get_answers = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_answers);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener respuestas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar una nueva respuesta
export const post_answers = async (req, res) => {
    const { answer_text, id_question, id_user } = req.body;

    if (!answer_text || !id_question || !id_user) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_answers, [answer_text, id_question, id_user]);
        const answerId = result.insertId;
        res.status(201).json({ id: answerId });
    } catch (error) {
        console.error('Error al insertar respuesta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar respuesta por ID
export const update_answers = async (req, res) => {
    const { answer_text, id_question, id_user } = req.body;
    const { Id } = req.params;

    if (!answer_text || !id_question || !id_user) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [answer] = await connection.execute(query.select_answers_byid, [Id]);
        if (answer.length === 0) {
            return res.status(404).json({ message: 'Respuesta no encontrada' });
        }

        await connection.execute(query.update_answers_byid, [answer_text, id_question, id_user, Id]);
        res.json({ message: 'Respuesta actualizada', answer: { answer_text, id_question, id_user } });
    } catch (error) {
        console.error('Error al actualizar respuesta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar respuesta por ID
export const delete_answers_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [answer] = await connection.execute(query.select_answers_byid, [Id]);
        if (answer.length === 0) {
            return res.status(404).json({ message: 'Respuesta no encontrada' });
        }

        await connection.execute(query.delete_answers_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar respuesta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener respuesta por ID
export const get_answers_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_answers_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Respuesta no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener respuesta por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
