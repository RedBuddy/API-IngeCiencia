import { getcon, query } from "../database";

// Obtener todos los mapeos de categorías de recursos
export const get_resource_categories_map = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_resource_categories_map);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener mapeos de categorías de recursos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo mapeo de categoría de recurso
export const post_resource_categories_map = async (req, res) => {
    const { id_resource, id_category } = req.body;

    if (!id_resource || !id_category) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_resource_categories_map, [id_resource, id_category]);
        const resourceCategoryId = result.insertId;
        res.status(201).json({ id: resourceCategoryId });
    } catch (error) {
        console.error('Error al insertar mapeo de categoría de recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar mapeo de categoría de recurso por ID
export const update_resource_categories_map = async (req, res) => {
    const { id_resource, id_category } = req.body;
    const { Id } = req.params;

    if (!id_resource || !id_category) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [categoryMap] = await connection.execute(query.select_resource_categories_map_byid, [Id]);
        if (categoryMap.length === 0) {
            return res.status(404).json({ message: 'Mapeo de categoría de recurso no encontrado' });
        }

        await connection.execute(query.update_resource_categories_map_byid, [id_resource, id_category, Id]);
        res.json({ message: 'Mapeo de categoría de recurso actualizado', categoryMap: { id_resource, id_category } });
    } catch (error) {
        console.error('Error al actualizar mapeo de categoría de recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar mapeo de categoría de recurso por ID
export const delete_resource_categories_map_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [categoryMap] = await connection.execute(query.select_resource_categories_map_byid, [Id]);
        if (categoryMap.length === 0) {
            return res.status(404).json({ message: 'Mapeo de categoría de recurso no encontrado' });
        }

        await connection.execute(query.delete_resource_categories_map_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar mapeo de categoría de recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener mapeo de categoría de recurso por ID
export const get_resource_categories_map_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_resource_categories_map_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Mapeo de categoría de recurso no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener mapeo de categoría de recurso por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
