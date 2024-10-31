import Category from '../database/models/Categories';
import { faker } from '@faker-js/faker';

export const post_categories = async (req, res) => {
    try {
        const newCategory = await Category.create({
            name: faker.commerce.department(),
            description: faker.lorem.sentence(),
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_categories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_categories_byid = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_categories = async (req, res) => {
    try {
        const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Category not found' });
        const updatedCategory = await Category.findByPk(req.params.id);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_categories_byid = async (req, res) => {
    try {
        const deleted = await Category.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Category not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
