import { getcon, query } from "../database";

// Obtener todas las asociaciones entre artículos y categorías
export const get_article_categories = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_article_categories);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener asociaciones artículo-categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar una nueva asociación entre artículo y categoría
export const post_article_categories = async (req, res) => {
    const { id_article, id_category } = req.body;

    if (!id_article || !id_category) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_article_categories, [id_article, id_category]);
        const articleCategoryId = result.insertId;
        res.status(201).json({ id: articleCategoryId });
    } catch (error) {
        console.error('Error al insertar asociación artículo-categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar asociación entre artículo y categoría por ID
export const update_article_categories = async (req, res) => {
    const { id_article, id_category } = req.body;
    const { Id } = req.params;

    if (!id_article || !id_category) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [article_category] = await connection.execute(query.select_article_categories_byid, [Id]);
        if (article_category.length === 0) {
            return res.status(404).json({ message: 'Asociación artículo-categoría no encontrada' });
        }

        await connection.execute(query.update_article_categories_byid, [id_article, id_category, Id]);
        res.json({ message: 'Asociación artículo-categoría actualizada', article_category: { id_article, id_category } });
    } catch (error) {
        console.error('Error al actualizar asociación artículo-categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar asociación artículo-categoría por ID
export const delete_article_categories_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [article_category] = await connection.execute(query.select_article_categories_byid, [Id]);
        if (article_category.length === 0) {
            return res.status(404).json({ message: 'Asociación artículo-categoría no encontrada' });
        }

        await connection.execute(query.delete_article_categories_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar asociación artículo-categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener asociación artículo-categoría por ID
export const get_article_categories_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_article_categories_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Asociación artículo-categoría no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener asociación artículo-categoría por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
