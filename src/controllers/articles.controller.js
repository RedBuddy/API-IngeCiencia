import Article from '../database/models/Articles';
import User from '../database/models/Users';
import multer from 'multer';

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

        if (!article) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        res.status(200).json(article);
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
