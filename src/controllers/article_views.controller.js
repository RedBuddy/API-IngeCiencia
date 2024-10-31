import ArticleView from '../database/models/ArticleViews';

export const post_article_views = async (req, res) => {
    try {
        const newView = await ArticleView.create({
            id_article: req.body.id_article,
            id_user: req.body.id_user,
            view_date: new Date() // O puedes usar: defaultValue: DataTypes.NOW en el modelo
        });
        res.status(201).json(newView);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_views = async (req, res) => {
    try {
        const views = await ArticleView.findAll();
        res.status(200).json(views);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_views_byid = async (req, res) => {
    try {
        const view = await ArticleView.findByPk({ id_article: req.params.id_article, id_user: req.params.id_user });
        if (!view) return res.status(404).json({ message: 'View not found' });
        res.status(200).json(view);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_article_views_byid = async (req, res) => {
    try {
        const deleted = await ArticleView.destroy({
            where: { id_article: req.params.id_article, id_user: req.params.id_user }
        });
        if (!deleted) return res.status(404).json({ message: 'View not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
