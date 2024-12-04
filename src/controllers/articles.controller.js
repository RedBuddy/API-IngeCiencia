import Article from '../database/models/Articles';
import User from '../database/models/Users';
import multer from 'multer';
import { Op } from 'sequelize';

// Configurar multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const post_articles = [
    upload.fields([
        { name: 'pdf', maxCount: 1 },
        { name: 'preview_img', maxCount: 1 }
    ]), // Middleware para manejar la subida de archivos
    async (req, res) => {
        try {
            const { id_author, title, doi, abstract, publication_date, link, status } = req.body;
            const pdf = req.files['pdf'] ? req.files['pdf'][0].buffer : null; // Obtener el archivo PDF subido
            const preview_img = req.files['preview_img'] ? req.files['preview_img'][0].buffer : null; // Obtener la imagen de vista previa subida

            // Crear el nuevo artículo
            const newArticle = await Article.create({
                id_author,
                title,
                doi,
                abstract,
                publication_date,
                link,
                pdf, // Almacenar el archivo PDF en la base de datos
                preview_img, // Almacenar la imagen de vista previa en la base de datos
                status
            });

            res.status(201).json(newArticle);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

export const get_articles = async (req, res) => {
    try {
        const articles = await Article.findAll({ });
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_articles_byid = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {});

        if (!article) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_articles_by_userid = async (req, res) => {
    try {
        const articles = await Article.findAll({
            where: { id_author: req.params.id }
        });

        if (!articles.length) {
            return res.status(404).json({ message: 'No articles found for this user' });
        }

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para obtener el archivo PDF de un artículo
export const get_article_pdf = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            attributes: ['pdf']
        });

        if (!article || !article.pdf) {
            return res.status(404).json({ message: 'Archivo PDF no encontrado' });
        }

        res.set('Content-Type', 'application/pdf');
        res.send(article.pdf);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para obtener la imagen de vista previa de un artículo
export const get_article_preview_img = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            attributes: ['preview_img']
        });

        if (!article || !article.preview_img) {
            return res.status(404).json({ message: 'Imagen de vista previa no encontrada' });
        }

        res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo de contenido según el formato de la imagen
        res.send(article.preview_img);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_articles = [
    upload.fields([
        { name: 'pdf', maxCount: 1 },
        { name: 'preview_img', maxCount: 1 }
    ]), // Middleware para manejar la subida de archivos
    async (req, res) => {
        try {
            const { id } = req.params;
            const { id_author, title, doi, abstract, publication_date, link, status } = req.body;
            const pdf = req.files['pdf'] ? req.files['pdf'][0].buffer : null; // Obtener el archivo PDF subido
            const preview_img = req.files['preview_img'] ? req.files['preview_img'][0].buffer : null; // Obtener la imagen de vista previa subida

            // Verificar si el artículo existe
            const article = await Article.findByPk(id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            // Actualizar el artículo
            await article.update({
                id_author,
                title,
                doi,
                abstract,
                publication_date,
                link,
                pdf: pdf || article.pdf, // Mantener el PDF existente si no se proporciona uno nuevo
                preview_img: preview_img || article.preview_img, // Mantener la imagen de vista previa existente si no se proporciona una nueva
                status
            });

            res.status(200).json(article);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

export const delete_articles_byid = async (req, res) => {
    try {
        const deleted = await Article.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Article not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const filter_articles = async (req, res) => {
    try {
        const searchString = req.params.searchString;

        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${searchString}%` } },
                    { abstract: { [Op.like]: `%${searchString}%` } },
                    { doi: { [Op.like]: `%${searchString}%` } },
                    { '$User.first_name$': { [Op.like]: `%${searchString}%` } },
                    { '$User.last_name$': { [Op.like]: `%${searchString}%` } },
                    { '$User.username$': { [Op.like]: `%${searchString}%` } }
                ]
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'first_name', 'last_name'],
                    required: false // Permitir artículos sin coincidencias en el autor
                }
            ]
        });

        if (!articles.length) {
            return res.status(204).json({ message: 'Articles not found' });
        }

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const get_article_author = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findOne({
            where: { id },
            attributes: [],
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'profile_img']
                }
            ]
        });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const author = article.User;

        res.status(200).json({
            first_name: author.first_name,
            last_name: author.last_name,
            profile_img: author.profile_img
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};