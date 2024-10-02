import { getcon, query } from "../database";

// Obtener todos los proyectos de investigación
export const get_research_projects = async (req, res) => {
    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_research_projects);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener proyectos de investigación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Insertar un nuevo proyecto de investigación
export const post_research_projects = async (req, res) => {
    const { project_name, description, start_date, end_date } = req.body;

    if (!project_name || !description || !start_date || !end_date) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [result] = await connection.execute(query.insert_research_projects, [
            project_name, description, start_date, end_date
        ]);
        const projectId = result.insertId;
        res.status(201).json({ id: projectId });
    } catch (error) {
        console.error('Error al insertar proyecto de investigación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar proyecto de investigación por ID
export const update_research_projects = async (req, res) => {
    const { project_name, description, start_date, end_date } = req.body;
    const { Id } = req.params;

    if (!project_name || !description || !start_date || !end_date) {
        return res.status(400).json({ message: 'Bad Request: Por favor llena todos los campos' });
    }

    try {
        const connection = await getcon();
        const [project] = await connection.execute(query.select_research_projects_byid, [Id]);
        if (project.length === 0) {
            return res.status(404).json({ message: 'Proyecto de investigación no encontrado' });
        }

        await connection.execute(query.update_research_projects_byid, [
            project_name, description, start_date, end_date, Id
        ]);
        res.json({ message: 'Proyecto de investigación actualizado', project: { project_name, description, start_date, end_date } });
    } catch (error) {
        console.error('Error al actualizar proyecto de investigación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar proyecto de investigación por ID
export const delete_research_projects_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [project] = await connection.execute(query.select_research_projects_byid, [Id]);
        if (project.length === 0) {
            return res.status(404).json({ message: 'Proyecto de investigación no encontrado' });
        }

        await connection.execute(query.delete_research_projects_byid, [Id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar proyecto de investigación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener proyecto de investigación por ID
export const get_research_projects_byid = async (req, res) => {
    const { Id } = req.params;

    try {
        const connection = await getcon();
        const [rows] = await connection.execute(query.select_research_projects_byid, [Id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Proyecto de investigación no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener proyecto de investigación por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
