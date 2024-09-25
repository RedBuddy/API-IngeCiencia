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
    const { Id_author, Title, Abstract, Publication_date, Link, Pdf_path, Preview_path } = req.body;

    // Validación de campos
    if (!Id_author || !Title || !Publication_date || !Preview_path) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    if (!Link && !Pdf_path) {
        return res.status(400).json({ msj: 'Bad Request: Debe proporcionar al menos un enlace o un archivo PDF.' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_articles, [
            Id_author, Title, Abstract, Publication_date, Link, Pdf_path, Preview_path
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
    const { Id_author, Title, Abstract, Publication_date, Link, Pdf_path, Preview_path, status } = req.body;
    const { id } = req.params;

    // Validación de campos
    if (!Id_author || !Title) {
        return res.status(400).json({ message: 'Bad Request: Id_author y Title son campos obligatorios' });
    }

    try {
        const connection = await getcon();

        // Verificar si el artículo existe antes de actualizar
        const [article] = await connection.execute(query.select_articles_byid, [id]);
        if (article.length === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        await connection.execute(query.update_articles_byid, [
            Id_author, Title, Abstract, Publication_date, Link, Pdf_path, Preview_path, status, id,
        ]);

        res.json({ message: 'Artículo actualizado', article: { Id_author, Title, Abstract, Publication_date, Link, Pdf_path, Preview_path, status } });
    } catch (error) {
        console.error('Error al actualizar artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar artículo por ID
export const delete_articles_byid = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await getcon();

        // Verificar si el artículo existe
        const [article] = await connection.execute(query.select_articles_byid, [id]);
        if (article.length === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        // Si existe, proceder a eliminar
        await connection.execute(query.delete_articles_byid, [id]);
        res.sendStatus(204); // No Content
    } catch (error) {
        console.error('Error al eliminar artículo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener artículo por ID
export const get_articles_byid = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_articles_byid, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener artículo por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
