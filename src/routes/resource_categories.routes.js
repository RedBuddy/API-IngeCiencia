import { Router } from "express";
import { get_resource_categories, post_resource_categories, update_resource_categories, delete_resource_categories_byid, get_resource_categories_byid } from "../controllers/resource_categories.controller"

const router = Router();

router.get('/resource_categories', get_resource_categories);
router.post('/resource_categories', post_resource_categories);
router.put('/resource_categories/:Id', update_resource_categories);
router.delete('/resource_categories/:Id', delete_resource_categories_byid);
router.get('/resource_categories/:Id', get_resource_categories_byid);

export default router;