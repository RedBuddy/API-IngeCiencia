import { Router } from "express";
import { get_articles, post_articles, update_articles, delete_articles_byid, get_articles_byid, get_articles_by_userid, get_article_pdf, get_article_preview_img, filter_articles, get_article_author } from "../controllers/articles.controller"

const router = Router();

router.get('/articles', get_articles);
router.post('/articles', post_articles);
router.put('/articles/:id', update_articles);
router.delete('/articles/:id', delete_articles_byid);
router.get('/articles/:id', get_articles_byid);
router.get('/articles/user_id/:id', get_articles_by_userid);
router.get('/articles/author/:id', get_article_author);
//Imagenes 
router.get('/articles/pdf/:id', get_article_pdf); 
router.get('/articles/preview_img/:id', get_article_preview_img); 
//Filtra los articulos por titulo o abstract
router.get('/article_filter/:searchString', filter_articles);

export default router;