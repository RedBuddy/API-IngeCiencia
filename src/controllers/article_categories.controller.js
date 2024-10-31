import ArticleCategoriesMap from '../database/models/ArticleCategoriesMap';
import Article from '../database/models/Articles';
import Category from '../database/models/Categories';

export const post_article_categories = async (req, res) => {
    try {
        const { id_article, id_category } = req.body;

        // Verificar que el artículo y la categoría existan
        const article = await Article.findByPk(id_article);
        const category = await Category.findByPk(id_category);

        if (!article || !category) {
            return res.status(404).json({ message: 'Article or Category not found' });
        }

        const newMapping = await ArticleCategoriesMap.create({
            id_article,
            id_category
        });
        res.status(201).json(newMapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_categories = async (req, res) => {
    try {
        const mappings = await ArticleCategoriesMap.findAll();
        res.status(200).json(mappings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_categories_byid = async (req, res) => {
    try {
        const mapping = await ArticleCategoriesMap.findByPk(req.params.id);
        if (!mapping) return res.status(404).json({ message: 'Mapping not found' });
        res.status(200).json(mapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_article_categories = async (req, res) => {
    try {
        const { id_article, id_category } = req.body;

        // Verificar que el artículo y la categoría existan
        const article = await Article.findByPk(id_article);
        const category = await Category.findByPk(id_category);

        if (!article || !category) {
            return res.status(404).json({ message: 'Article or Category not found' });
        }

        const [updated] = await ArticleCategoriesMap.update(req.body, { where: { id_article: req.params.id_article, id_category: req.params.id_category } });
        if (!updated) return res.status(404).json({ message: 'Mapping not found' });
        const updatedMapping = await ArticleCategoriesMap.findByPk(req.params.id);
        res.status(200).json(updatedMapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_article_categories_byid = async (req, res) => {
    try {
        const deleted = await ArticleCategoriesMap.destroy({ where: { id_article: req.params.id_article, id_category: req.params.id_category } });
        if (!deleted) return res.status(404).json({ message: 'Mapping not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
