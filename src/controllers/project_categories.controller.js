import ProjectCategoriesMap from '../database/models/ProjectCategoriesMap';
import { faker } from '@faker-js/faker';

export const post_project_categories = async (req, res) => {
    try {
        const newMap = await ProjectCategoriesMap.create({
            id_project: req.body.id_project, // Asegúrate de que este ID existe en la tabla de proyectos
            id_category: req.body.id_category, // Asegúrate de que este ID existe en la tabla de categorías
        });
        res.status(201).json(newMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_project_categories = async (req, res) => {
    try {
        const maps = await ProjectCategoriesMap.findAll();
        res.status(200).json(maps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_project_categories_byid = async (req, res) => {
    try {
        const map = await ProjectCategoriesMap.findByPk(req.params.id);
        if (!map) return res.status(404).json({ message: 'Project-Category mapping not found' });
        res.status(200).json(map);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_project_categories = async (req, res) => {
    try {
        const [updated] = await ProjectCategoriesMap.update(req.body, { where: { id_project: req.params.id_project, id_category: req.params.id_category } });
        if (!updated) return res.status(404).json({ message: 'Project-Category mapping not found' });
        const updatedMap = await ProjectCategoriesMap.findOne({ where: { id_project: req.params.id_project, id_category: req.params.id_category } });
        res.status(200).json(updatedMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_project_categories_byid = async (req, res) => {
    try {
        const deleted = await ProjectCategoriesMap.destroy({ where: { id_project: req.params.id_project, id_category: req.params.id_category } });
        if (!deleted) return res.status(404).json({ message: 'Project-Category mapping not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
