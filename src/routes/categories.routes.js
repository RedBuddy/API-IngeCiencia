import { Router } from "express";
import { get_categories, post_categories, update_categories, delete_categories_byid, get_categories_byid } from "../controllers/categories.controller"

const router = Router();

router.get('/categories', get_categories);
router.post('/categories', post_categories);
router.put('/categories/:Id', update_categories);
router.delete('/categories/:Id', delete_categories_byid);
router.get('/categories/:Id', get_categories_byid);

export default router;