import { getcon, query } from "../database";

// Obtener todos los coautores de recursos
export const get_resource_coauthors = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_resource_coauthors);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener coautores de recursos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo coautor de recurso
export const post_resource_coauthors = async (req, res) => {
    const { id_resource, id_coauthor } = req.body;

    if (!id_resource || !id_coauthor) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_resource_coauthors, [id_resource, id_coauthor]);
        const resourceCoauthorId = result.insertId;
        res.status(201).json({ id: resourceCoauthorId });
    } catch (error) {
        console.error('Error al insertar coautor de recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar coautor de recurso por ID
export const update_resource_coauthors = async (req, res) => {
    const { id_resource, id_coauthor } = req.body;
    const { Id } = req.params;

    if (!id_resource || !id_coauthor) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [resource_coauthor] = await connection.execute(query.select_resource_coauthors_byid, [Id]);
        if (resource_coauthor.length === 0) {
            return res.status(404).json({ message: 'Coautor de recurso no encontrado' });
        }

        await connection.execute(query.update_resource_coauthors_byid, [id_resource, id_coauthor, Id]);
        res.json({ message: 'Coautor de recurso actualizado', coauthor: { id_resource, id_coauthor } });
    } catch (error) {
        console.error('Error al actualizar coautor de recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar coautor de recurso por ID
export const delete_resource_coauthors_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [resource_coauthor] = await connection.execute(query.select_resource_coauthors_byid, [Id]);
        if (resource_coauthor.length === 0) {
            return res.status(404).json({ message: 'Coautor de recurso no encontrado' });
        }

        await connection.execute(query.delete_resource_coauthors_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar coautor de recurso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener coautor de recurso por ID
export const get_resource_coauthors_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_resource_coauthors_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Coautor de recurso no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener coautor de recurso por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
