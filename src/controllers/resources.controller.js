import { getcon, query } from "../database";

// Obtener todos los recursos
export const get_resources = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_resources);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener recursos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo recurso
export const post_resources = async (req, res) => {
    const { resource_name, resource_path, resource_type } = req.body;

    if (!resource_name || !resource_path || !resource_type) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_resources, [
            resource_name, resource_path, resource_type
        ]);
        const resourceId = result.insertId;
        res.status(201).json({ id: resourceId });
    } catch (error) {
        console.error('Error al insertar recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar recurso por ID
export const update_resources = async (req, res) => {
    const { resource_name, resource_path, resource_type } = req.body;
    const { Id } = req.params;

    if (!resource_name || !resource_path || !resource_type) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [resource] = await connection.execute(query.select_resources_byid, [Id]);
        if (resource.length === 0) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        await connection.execute(query.update_resources_byid, [
            resource_name, resource_path, resource_type, Id
        ]);
        res.json({ message: 'Recurso actualizado', resource: { resource_name, resource_path, resource_type } });
    } catch (error) {
        console.error('Error al actualizar recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar recurso por ID
export const delete_resources_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [resource] = await connection.execute(query.select_resources_byid, [Id]);
        if (resource.length === 0) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        await connection.execute(query.delete_resources_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener recurso por ID
export const get_resources_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_resources_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener recurso por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
