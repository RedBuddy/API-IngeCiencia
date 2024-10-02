import { getcon, query } from "../database";

// Obtener todas las categorías
export const get_categories = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_categories);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar una nueva categoría
export const post_categories = async (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({ message: 'Bad Request: Por favor ingresa el nombre de la categoría' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_categories, [category_name]);
        const categoryId = result.insertId;
        res.status(201).json({ id: categoryId });
    } catch (error) {
        console.error('Error al insertar categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar categoría por ID
export const update_categories = async (req, res) => {
    const { category_name } = req.body;
    const { Id } = req.params;

    if (!category_name) {
        return res.status(400).json({ message: 'Bad Request: Por favor ingresa el nombre de la categoría' });
    }

    try {
        const connection = await getcon();
        const [category] = await connection.execute(query.select_categories_byid, [Id]);
        if (category.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        await connection.execute(query.update_categories_byid, [category_name, Id]);
        res.json({ message: 'Categoría actualizada', category: { category_name } });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar categoría por ID
export const delete_categories_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [category] = await connection.execute(query.select_categories_byid, [Id]);
        if (category.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        await connection.execute(query.delete_categories_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener categoría por ID
export const get_categories_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_categories_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
