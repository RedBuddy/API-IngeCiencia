import { getcon, query } from "../database";

// Obtener todos los coautores de artículos
export const get_article_coauthors = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_article_coauthors);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener coautores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo coautor para un artículo
export const post_article_coauthors = async (req, res) => {
    const { id_article, id_coauthor } = req.body;

    if (!id_article || !id_coauthor) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_article_coauthors, [id_article, id_coauthor]);
        const coauthorId = result.insertId;
        res.status(201).json({ id: coauthorId });
    } catch (error) {
        console.error('Error al insertar coautor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar coautor por ID
export const update_article_coauthors = async (req, res) => {
    const { id_article, id_coauthor } = req.body;
    const { Id } = req.params;

    if (!id_article || !id_coauthor) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [coauthor] = await connection.execute(query.select_article_coauthors_byid, [Id]);
        if (coauthor.length === 0) {
            return res.status(404).json({ message: 'Coautor no encontrado' });
        }

        await connection.execute(query.update_article_coauthors_byid, [id_article, id_coauthor, Id]);
        res.json({ message: 'Coautor actualizado', coauthor: { id_article, id_coauthor } });
    } catch (error) {
        console.error('Error al actualizar coautor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar coautor por ID
export const delete_article_coauthors_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [coauthor] = await connection.execute(query.select_article_coauthors_byid, [Id]);
        if (coauthor.length === 0) {
            return res.status(404).json({ message: 'Coautor no encontrado' });
        }

        await connection.execute(query.delete_article_coauthors_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar coautor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener coautor por ID
export const get_article_coauthors_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_article_coauthors_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Coautor no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener coautor por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
