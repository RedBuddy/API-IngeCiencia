import { Router } from "express";
import { get_article_coauthors, post_article_coauthors, update_article_coauthors, delete_article_coauthors_byid, get_article_coauthors_byid } from "../controllers/article_coauthors.controller"

const router = Router();

router.get('/article_coauthors', get_article_coauthors);
router.post('/article_coauthors', post_article_coauthors);
router.put('/article_coauthors/:id', update_article_coauthors);
router.delete('/article_coauthors/:id', delete_article_coauthors_byid);
router.get('/article_coauthors/:id', get_article_coauthors_byid);

export default router;