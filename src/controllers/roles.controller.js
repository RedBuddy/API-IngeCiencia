import { getcon, query } from "../database";

// Obtener todos los roles
export const get_roles = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_roles);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo rol
export const post_roles = async (req, res) => {
    const { role_name } = req.body;

    if (!role_name) {
        return res.status(400).json({ message: 'Bad Request: Por favor ingresa el nombre del rol' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_roles, [role_name]);
        const roleId = result.insertId;
        res.status(201).json({ id: roleId });
    } catch (error) {
        console.error('Error al insertar rol:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un rol por ID
export const update_roles = async (req, res) => {
    const { role_name } = req.body;
    const { Id } = req.params;

    if (!role_name) {
        return res.status(400).json({ message: 'Bad Request: Por favor ingresa el nombre del rol' });
    }

    try {
        const connection = await getcon();
        const [role] = await connection.execute(query.select_roles_byid, [Id]);
        if (role.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        await connection.execute(query.update_roles_byid, [role_name, Id]);
        res.json({ message: 'Rol actualizado', role: { role_name } });
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un rol por ID
export const delete_roles_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [role] = await connection.execute(query.select_roles_byid, [Id]);
        if (role.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        await connection.execute(query.delete_roles_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener rol por ID
export const get_roles_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_roles_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener rol por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
