import { getcon, query } from "../database";

// Obtener todas las preguntas
export const get_questions = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_questions);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar una nueva pregunta
export const post_questions = async (req, res) => {
    const { question_text, id_user } = req.body;

    if (!question_text || !id_user) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_questions, [question_text, id_user]);
        const questionId = result.insertId;
        res.status(201).json({ id: questionId });
    } catch (error) {
        console.error('Error al insertar pregunta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar pregunta por ID
export const update_questions = async (req, res) => {
    const { question_text, id_user } = req.body;
    const { Id } = req.params;

    if (!question_text || !id_user) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [question] = await connection.execute(query.select_questions_byid, [Id]);
        if (question.length === 0) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }

        await connection.execute(query.update_questions_byid, [question_text, id_user, Id]);
        res.json({ message: 'Pregunta actualizada', question: { question_text, id_user } });
    } catch (error) {
        console.error('Error al actualizar pregunta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar pregunta por ID
export const delete_questions_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [question] = await connection.execute(query.select_questions_byid, [Id]);
        if (question.length === 0) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }

        await connection.execute(query.delete_questions_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar pregunta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener pregunta por ID
export const get_questions_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_questions_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener pregunta por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
