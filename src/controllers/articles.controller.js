import Article from '../database/models/Articles';
import User from '../database/models/Users';
import { faker } from '@faker-js/faker';

export const post_articles = async (req, res) => {
    try {
        const newArticle = await Article.create({
            id_author: req.body.id_author,
            title: faker.lorem.sentence(),
            doi: faker.internet.url(),
            abstract: faker.lorem.paragraph(),
            publication_date: faker.date.past(),
            link: faker.internet.url(),
            pdf_path: faker.system.filePath(),
            preview_path: faker.image.imageUrl()
        });
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_articles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: {
                model: User,
                attributes: ['username', 'email']
            }
        });
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_articles_byid = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ['username', 'email']
            }
        });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_articles = async (req, res) => {
    try {
        const [updated] = await Article.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Article not found' });
        const updatedArticle = await Article.findByPk(req.params.id);
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_articles_byid = async (req, res) => {
    try {
        const deleted = await Article.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Article not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
