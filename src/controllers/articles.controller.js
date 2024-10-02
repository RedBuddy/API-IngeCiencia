import { getcon, query } from "../database";

// Obtener todos los artículos
export const get_articles = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_articles);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener artículos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo artículo
export const post_articles = async (req, res) => {
    const { id_author, title, abstract, publication_date, link, pdf_path, preview_path } = req.body;

    if (!title || !abstract || !publication_date || !link || !pdf_path || !preview_path) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_articles, [
            id_author, title, abstract, publication_date, link, pdf_path, preview_path
        ]);

        const articleId = result.insertId;
        res.status(201).json({ id: articleId });
    } catch (error) {
        console.error('Error al insertar artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar artículo por ID
export const update_articles = async (req, res) => {
    const { id_author, title, abstract, publication_date, link, pdf_path, preview_path } = req.body;
    const { Id } = req.params;

    if (!id_author || !title || !abstract || !publication_date || !link || !pdf_path || !preview_path) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [article] = await connection.execute(query.select_articles_byid, [Id]);
        if (article.length === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        await connection.execute(query.update_articles_byid, [
            id_author, title, abstract, publication_date, link, pdf_path, preview_path, Id
        ]);

        res.json({ message: 'Artículo actualizado', article: { id_author, title, abstract, publication_date, link, pdf_path, preview_path } });
    } catch (error) {
        console.error('Error al actualizar artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar artículo por ID
export const delete_articles_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [article] = await connection.execute(query.select_articles_byid, [Id]);
        if (article.length === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        await connection.execute(query.delete_articles_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener artículo por ID
export const get_articles_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_articles_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener artículo por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
