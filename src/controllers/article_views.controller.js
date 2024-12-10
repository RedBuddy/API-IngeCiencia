import ArticleView from '../database/models/ArticleViews';

export const get_article_views = async (req, res) => {
    try {
        const views = await ArticleView.findAll();
        res.status(200).json(views);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

