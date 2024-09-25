import { Router } from "express";
import { get_articles, post_articles, update_articles, delete_articles_byid, get_articles_byid } from "../controllers/articles.controller"

const router = Router();

router.get('/articles', get_articles);
router.post('/articles', post_articles);
router.put('/articles/:Id', update_articles);
router.delete('/articles/:Id', delete_articles_byid);
router.get('/articles/:Id', get_articles_byid);

export default router;