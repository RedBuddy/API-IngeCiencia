import ArticleCategoriesMap from '../database/models/ArticleCategoriesMap';
import Article from '../database/models/Articles';
import Category from '../database/models/Categories';

// Asegúrate de que las asociaciones estén configuradas correctamente
ArticleCategoriesMap.belongsTo(Article, { foreignKey: 'id_article' });
ArticleCategoriesMap.belongsTo(Category, { foreignKey: 'id_category' });

export const post_article_categories = async (req, res) => {
    try {
        const { id_article, id_category } = req.body;

        // Verificar que el artículo y la categoría existan
        const article = await Article.findByPk(id_article);
        const category = await Category.findByPk(id_category);

        if (!article || !category) {
            return res.status(404).json({ message: 'Article or Category not found' });
        }

        // Verificar si ya existe una entrada con los mismos id_article e id_category
        const existingEntry = await ArticleCategoriesMap.findOne({
            where: {
                id_article,
                id_category
            }
        });

        if (existingEntry) {
            return res.status(409).json({ error: 'Duplicate entry: Article category already exists' });
        }

        // Crear una nueva entrada si no existe duplicado
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
        const mappings = await ArticleCategoriesMap.findAll({
            include: [
                { model: Article, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });
        res.status(200).json(mappings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_categories_byid = async (req, res) => {
    try {
        const mappings = await ArticleCategoriesMap.findAll({
            where: { id_article: req.params.id },
            include: [
                { model: Article, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        const result = {
            id_article: req.params.id,
            id_categories: mappings.map(ac => ac.id_category)
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_article_categories = async (req, res) => {
    const { id_article, id_categories } = req.body;

    try {
        // Eliminar todas las categorías actuales del artículo
        await ArticleCategoriesMap.destroy({
            where: { id_article }
        });

        // Crear nuevas entradas para las categorías proporcionadas
        const newArticleCategories = await Promise.all(
            id_categories.map(async (id_category) => {
                return await ArticleCategoriesMap.create({
                    id_article,
                    id_category
                });
            })
        );

        // Obtener las categorías actualizadas del artículo
        const updatedArticleCategories = await ArticleCategoriesMap.findAll({
            where: { id_article },
            include: [
                { model: Article, attributes: ['title'] },
                { model: Category, attributes: ['category_name'] }
            ]
        });

        res.status(200).json(updatedArticleCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_article_categories_byid = async (req, res) => {
    try {
        const deleted = await ArticleCategoriesMap.destroy({
            where: { id_article: req.params.id, id_category: req.body.id_category }
        });
        if (!deleted) return res.status(404).json({ message: 'Article category not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
