import { Router } from "express";
import { get_article_categories, post_article_categories, update_article_categories, delete_article_categories_byid, get_article_categories_byid } from "../controllers/article_categories.controller"

const router = Router();

router.get('/article_categories', get_article_categories);
router.post('/article_categories', post_article_categories);
router.put('/article_categories/:Id', update_article_categories);
router.delete('/article_categories/:Id', delete_article_categories_byid);
router.get('/article_categories/:Id', get_article_categories_byid);

export default router;