import Category from '../database/models/Categories';

export const post_categories = async (req, res) => {
    try {
        const { category_name } = req.body;

        // Crear la nueva categoría
        const newCategory = await Category.create({
            category_name
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
        const { category_name } = req.body;

        const [updated] = await Category.update({ category_name }, { where: { id: req.params.id } });
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
