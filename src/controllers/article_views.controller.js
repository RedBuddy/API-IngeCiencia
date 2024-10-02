import { getcon, query } from "../database";

// Obtener todas las vistas de artículos
export const get_article_views = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_article_views);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener vistas de artículos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar una nueva vista para un artículo
export const post_article_views = async (req, res) => {
    const { id_article, views } = req.body;

    if (!id_article || views === undefined) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_article_views, [id_article, views]);
        const articleViewId = result.insertId;
        res.status(201).json({ id: articleViewId });
    } catch (error) {
        console.error('Error al insertar vista de artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar vistas de artículo por ID
export const update_article_views = async (req, res) => {
    const { views } = req.body;
    const { Id } = req.params;

    if (views === undefined) {
        return res.status(400).json({ message: 'Bad Request: Por favor ingresa el número de vistas' });
    }

    try {
        const connection = await getcon();
        const [article_view] = await connection.execute(query.select_article_views_byid, [Id]);
        if (article_view.length === 0) {
            return res.status(404).json({ message: 'Vista de artículo no encontrada' });
        }

        await connection.execute(query.update_article_views_byid, [views, Id]);
        res.json({ message: 'Vista de artículo actualizada', views });
    } catch (error) {
        console.error('Error al actualizar vista de artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar vista de artículo por ID
export const delete_article_views_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [article_view] = await connection.execute(query.select_article_views_byid, [Id]);
        if (article_view.length === 0) {
            return res.status(404).json({ message: 'Vista de artículo no encontrada' });
        }

        await connection.execute(query.delete_article_views_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar vista de artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener vista de artículo por ID
export const get_article_views_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_article_views_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Vista de artículo no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener vista de artículo por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
