import ResearchProject from '../database/models/ResearchProjects';
import User from '../database/models/Users';
import multer from 'multer';
import { Op } from 'sequelize';

// Configurar multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const post_research_projects = [
    upload.single('preview_img'), // Middleware para manejar la subida de la imagen de vista previa
    async (req, res) => {
        try {
            const { id_author, title, details, vacancies, status } = req.body;
            const preview_img = req.file ? req.file.buffer : null; // Obtener la imagen de vista previa subida

            // Crear el nuevo proyecto de investigación
            const newProject = await ResearchProject.create({
                id_author,
                title,
                details,
                vacancies,
                preview_img, // Almacenar la imagen de vista previa en la base de datos
                status
            });

            res.status(201).json(newProject);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

export const get_research_projects = async (req, res) => {
    try {
        const projects = await ResearchProject.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'first_name', 'last_name']
                }
            ]
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_research_projects_byid = async (req, res) => {
    try {
        const project = await ResearchProject.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'first_name', 'last_name']
                }
            ]
        });

        if (!project) {
            return res.status(404).json({ message: 'Research project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_projects_by_userid = async (req, res) => {
    try {
        const projects = await ResearchProject.findAll({
            where: { id_author: req.params.id },
        });

        if (!projects.length) {
            return res.status(204).json({ message: 'No se encontraron proyectos de investigación para este usuario' });
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_research_projects = [
    upload.single('preview_img'), // Middleware para manejar la subida de la imagen de vista previa
    async (req, res) => {
        try {
            const { id } = req.params;
            const { id_author, title, details, vacancies, status } = req.body;
            const preview_img = req.file ? req.file.buffer : null; // Obtener la imagen de vista previa subida

            // Verificar si el proyecto de investigación existe
            const project = await ResearchProject.findByPk(id);
            if (!project) {
                return res.status(404).json({ message: 'Research project not found' });
            }

            // Actualizar el proyecto de investigación
            await project.update({
                id_author,
                title,
                details,
                vacancies,
                preview_img: preview_img || project.preview_img, // Mantener la imagen de vista previa existente si no se proporciona una nueva
                status
            });

            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

export const delete_research_projects_byid = async (req, res) => {
    try {
        const deleted = await ResearchProject.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Research project not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const filter_research_projects = async (req, res) => {
    try {
        const searchString = req.params.searchString;

        const projects = await ResearchProject.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${searchString}%` } },
                    { details: { [Op.like]: `%${searchString}%` } },
                    { '$User.first_name$': { [Op.like]: `%${searchString}%` } },
                    { '$User.last_name$': { [Op.like]: `%${searchString}%` } },
                    { '$User.username$': { [Op.like]: `%${searchString}%` } }
                ]
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'first_name', 'last_name'],
                    required: false // Permitir proyectos sin coincidencias en el autor
                }
            ]
        });

        if (!projects.length) {
            return res.status(404).json({ message: 'Research projects not found' });
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_research_project_author = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await ResearchProject.findOne({
            where: { id },
            attributes: [],
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'profile_img']
                }
            ]
        });

        if (!project) {
            return res.status(404).json({ message: 'Research project not found' });
        }

        const author = project.User;

        res.status(200).json({
            first_name: author.first_name,
            last_name: author.last_name,
            profile_img: author.profile_img
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
