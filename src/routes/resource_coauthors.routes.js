import { Router } from "express";
import { get_resource_coauthors, post_resource_coauthors, update_resource_coauthors, delete_resource_coauthors_byid, get_resource_coauthors_byid } from "../controllers/resource_coauthors.controller"

const router = Router();

router.get('/resource_coauthors', get_resource_coauthors);
router.post('/resource_coauthors', post_resource_coauthors);
router.put('/resource_coauthors/:id', update_resource_coauthors);
router.delete('/resource_coauthors/:id', delete_resource_coauthors_byid);
router.get('/resource_coauthors/:id', get_resource_coauthors_byid);

export default router;