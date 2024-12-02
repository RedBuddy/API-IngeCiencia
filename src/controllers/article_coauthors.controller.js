import ArticleCoauthor from '../database/models/ArticleCoauthorsMap';
import Article from '../database/models/Articles';
import User from '../database/models/Users';

// Asegúrate de que las asociaciones estén configuradas correctamente
ArticleCoauthor.belongsTo(Article, { foreignKey: 'id_article' });
ArticleCoauthor.belongsTo(User, { foreignKey: 'id_coauthor' });

export const post_article_coauthors = async (req, res) => {
    try {
        // Verificar si ya existe una entrada con los mismos id_article e id_coauthor
        const existingEntry = await ArticleCoauthor.findOne({
            where: {
                id_article: req.body.id_article,
                id_coauthor: req.body.id_coauthor
            }
        });

        if (existingEntry) {
            return res.status(409).json({ error: 'Duplicate entry: Article coauthor already exists' });
        }

        // Crear una nueva entrada si no existe duplicado
        const newCoauthor = await ArticleCoauthor.create({
            id_article: req.body.id_article,
            id_coauthor: req.body.id_coauthor
        });

        res.status(201).json(newCoauthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_coauthors = async (req, res) => {
    try {
        const coauthors = await ArticleCoauthor.findAll({
            include: [
                { model: Article, attributes: ['title'] },
                { model: User, attributes: ['username', 'email'] }
            ]
        });
        res.status(200).json(coauthors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_article_coauthors_byid = async (req, res) => {
    try {
        const coauthors = await ArticleCoauthor.findAll({
            where: { id_article: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'profile_img']
                }
            ]
        });

        const result = coauthors.map(coauthor => coauthor.User);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_article_coauthors = async (req, res) => {
    const { id_article, id_coauthors } = req.body;

    try {
        // Eliminar todos los coautores actuales del artículo
        await ArticleCoauthor.destroy({
            where: { id_article }
        });

        // Crear nuevas entradas para los coautores proporcionados
        const newArticleCoauthors = await Promise.all(
            id_coauthors.map(async (id_coauthor) => {
                return await ArticleCoauthor.create({
                    id_article,
                    id_coauthor
                });
            })
        );

        // Obtener los coautores actualizados del artículo
        const updatedArticleCoauthors = await ArticleCoauthor.findAll({
            where: { id_article },
            include: [
                { model: Article, attributes: ['title'] },
                { model: User, attributes: ['username', 'email'] }
            ]
        });

        res.status(200).json(updatedArticleCoauthors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_article_coauthors_byid = async (req, res) => {
    try {
        const deleted = await ArticleCoauthor.destroy({
            where: { id_article: req.params.id, id_coauthor: req.body.id_coauthor }
        });
        if (!deleted) return res.status(404).json({ message: 'Article coauthor not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
