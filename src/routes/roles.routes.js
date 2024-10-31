import { Router } from "express";
import { get_roles, post_roles, update_roles, delete_roles_byid, get_roles_byid } from "../controllers/roles.controller"

const router = Router();

router.get('/roles', get_roles);
router.post('/roles', post_roles);
router.put('/roles/:id', update_roles);
router.delete('/roles/:id', delete_roles_byid);
router.get('/roles/:id', get_roles_byid);

export default router;