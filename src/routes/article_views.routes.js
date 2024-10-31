import { Router } from "express";
import { get_article_views, post_article_views, update_article_views, delete_article_views_byid, get_article_views_byid } from "../controllers/article_views.controller"

const router = Router();

router.get('/article_views', get_article_views);
router.post('/article_views', post_article_views);
// router.put('/article_views/:id', update_article_views);
router.delete('/article_views/:id', delete_article_views_byid);
router.get('/article_views/:id', get_article_views_byid);

export default router;