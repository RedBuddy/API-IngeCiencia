import { Router } from "express";
import { get_articles, post_articles, update_articles, delete_articles_byid, get_articles_byid, get_article_pdf, get_article_preview_img } from "../controllers/articles.controller"

const router = Router();

router.get('/articles', get_articles);
router.post('/articles', post_articles);
router.put('/articles/:id', update_articles);
router.delete('/articles/:id', delete_articles_byid);
router.get('/articles/:id', get_articles_byid);
//Imagenes 
router.get('/articles/pdf/:id', get_article_pdf); 
router.get('/articles/preview_img/:id', get_article_preview_img); 

export default router;