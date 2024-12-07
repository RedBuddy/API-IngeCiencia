import ProjectCategoriesMap from '../database/models/ProjectCategoriesMap';
import ResearchProject from '../database/models/ResearchProjects';
import Category from '../database/models/Categories';

export const post_project_categories = async (req, res) => {
    try {
        const { id_project, id_category } = req.body;

        // Verificar que el proyecto y la categoría existan
        const project = await ResearchProject.findByPk(id_project);
        const category = await Category.findByPk(id_category);

        if (!project || !category) {
            return res.status(404).json({ message: 'Project or Category not found' });
        }

        // Verificar si ya existe una entrada con los mismos id_project e id_category
        const existingEntry = await ProjectCategoriesMap.findOne({
            where: {
                id_project,
                id_category
            }
        });

        if (existingEntry) {
            return res.status(409).json({ error: 'Duplicate entry: Project category already exists' });
        }

        // Crear una nueva entrada si no existe duplicado
        const newMapping = await ProjectCategoriesMap.create({
            id_project,
            id_category
        });
        res.status(201).json(newMapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_project_categories = async (req, res) => {
    try {
        const mappings = await ProjectCategoriesMap.findAll({
            include: [
                { model: ResearchProject, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });
        res.status(200).json(mappings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_project_categories_byid = async (req, res) => {
    try {
        const mappings = await ProjectCategoriesMap.findAll({
            where: { id_project: req.params.id },
            include: [
                { model: ResearchProject, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        const result = {
            id_project: req.params.id,
            id_categories: mappings.map(pc => pc.id_category)
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_project_categories = async (req, res) => {
    const { id_project, id_categories } = req.body;

    try {
        // Eliminar todas las categorías actuales del proyecto
        await ProjectCategoriesMap.destroy({
            where: { id_project }
        });

        // Crear nuevas entradas para las categorías proporcionadas
        const newProjectCategories = await Promise.all(
            id_categories.map(async (id_category) => {
                return await ProjectCategoriesMap.create({
                    id_project,
                    id_category
                });
            })
        );

        // Obtener las categorías actualizadas del proyecto
        const updatedProjectCategories = await ProjectCategoriesMap.findAll({
            where: { id_project },
            include: [
                { model: ResearchProject, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        res.status(200).json(updatedProjectCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_project_categories_byid = async (req, res) => {
    try {
        const deleted = await ProjectCategoriesMap.destroy({
            where: { id_project: req.params.id, id_category: req.body.id_category }
        });
        if (!deleted) return res.status(404).json({ message: 'Project category not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
