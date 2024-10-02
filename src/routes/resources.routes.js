import { Router } from "express";
import { get_resources, post_resources, update_resources, delete_resources_byid, get_resources_byid } from "../controllers/resources.controller"

const router = Router();

router.get('/resources', get_resources);
router.post('/resources', post_resources);
router.put('/resources/:Id', update_resources);
router.delete('/resources/:Id', delete_resources_byid);
router.get('/resources/:Id', get_resources_byid);

export default router;