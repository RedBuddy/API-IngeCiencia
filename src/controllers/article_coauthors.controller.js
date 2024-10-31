import ArticleCoauthorsMap from '../database/models/ArticleCoauthorsMap';
import Article from '../database/models/Articles';
import User from '../database/models/Users';

export const post_article_coauthors = async (req, res) => {
    try {
        const { id_article, id_coauthor } = req.body;

        // Verificar que el artículo y el coautor existan
        const article = await Article.findByPk(id_article);
        const coauthor = await User.findByPk(id_coauthor);

        if (!article || !coauthor) {
            return res.status(404).json({ message: 'Article or Coauthor not found' });
        }

        const newMapping = await ArticleCoauthorsMap.create({
            id_article,
            id_coauthor
        });
        res.status(201).json(newMapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_coauthors = async (req, res) => {
    try {
        const mappings = await ArticleCoauthorsMap.findAll();
        res.status(200).json(mappings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_coauthors_byid = async (req, res) => {
    try {
        const mapping = await ArticleCoauthorsMap.findByPk(req.params.id);
        if (!mapping) return res.status(404).json({ message: 'Mapping not found' });
        res.status(200).json(mapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_article_coauthors = async (req, res) => {
    try {
        const { id_article, id_coauthor } = req.body;

        // Verificar que el artículo y el coautor existan
        const article = await Article.findByPk(id_article);
        const coauthor = await User.findByPk(id_coauthor);

        if (!article || !coauthor) {
            return res.status(404).json({ message: 'Article or Coauthor not found' });
        }

        const [updated] = await ArticleCoauthorsMap.update(req.body, { where: { id_article: req.params.id_article, id_coauthor: req.params.id_coauthor } });
        if (!updated) return res.status(404).json({ message: 'Mapping not found' });
        const updatedMapping = await ArticleCoauthorsMap.findByPk(req.params.id);
        res.status(200).json(updatedMapping);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_article_coauthors_byid = async (req, res) => {
    try {
        const deleted = await ArticleCoauthorsMap.destroy({ where: { id_article: req.params.id_article, id_coauthor: req.params.id_coauthor } });
        if (!deleted) return res.status(404).json({ message: 'Mapping not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
