import { Router } from "express";
import { get_article_coauthors, post_article_coauthors, update_article_coauthors, delete_article_coauthors_byid, get_article_coauthors_byid } from "../controllers/article_coauthors.controller"

const router = Router();

router.get('/article_coauthors', get_article_coauthors);
router.post('/article_coauthors', post_article_coauthors);
router.put('/article_coauthors/:Id', update_article_coauthors);
router.delete('/article_coauthors/:Id', delete_article_coauthors_byid);
router.get('/article_coauthors/:Id', get_article_coauthors_byid);

export default router;