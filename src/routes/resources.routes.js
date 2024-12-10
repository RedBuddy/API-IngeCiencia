import { Router } from "express";
import { get_resources, post_resources, update_resources, delete_resources_byid, get_resources_byid, get_resource_author } from "../controllers/resources.controller"

const router = Router();

router.get('/resources', get_resources);
router.post('/resources', post_resources);
router.put('/resources/:id', update_resources);
router.delete('/resources/:id', delete_resources_byid);
router.get('/resources/:id', get_resources_byid);
// Obtener autor del recurso
router.get('/resources/author/:id', get_resource_author);

export default router;