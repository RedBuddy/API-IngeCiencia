import { Router } from "express";
import { get_project_categories, post_project_categories, update_project_categories, delete_project_categories_byid, get_project_categories_byid } from "../controllers/project_categories.controller"

const router = Router();

router.get('/project_categories', get_project_categories);
router.post('/project_categories', post_project_categories);
router.put('/project_categories/:id', update_project_categories);
router.delete('/project_categories/:id', delete_project_categories_byid);
router.get('/project_categories/:id', get_project_categories_byid);

export default router;