import { Router } from "express";
import { get_article_views } from "../controllers/article_views.controller"

const router = Router();

router.get('/article_views', get_article_views);


export default router;