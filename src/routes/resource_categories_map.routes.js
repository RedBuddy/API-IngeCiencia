import { Router } from "express";
import { get_resource_categories_map, post_resource_categories_map, update_resource_categories_map, delete_resource_categories_map_byid, get_resource_categories_map_byid } from "../controllers/resource_categories_map.controller"

const router = Router();

router.get('/resource_categories_map', get_resource_categories_map);
router.post('/resource_categories_map', post_resource_categories_map);
router.put('/resource_categories_map/:Id', update_resource_categories_map);
router.delete('/resource_categories_map/:Id', delete_resource_categories_map_byid);
router.get('/resource_categories_map/:Id', get_resource_categories_map_byid);

export default router;