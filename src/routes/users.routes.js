import { Router } from "express";
import { get_users, post_users, update_users, delete_users_byid, get_users_byid } from "../controllers/users.controller"

const router = Router();

router.get('/users', get_users);
router.post('/users', post_users);
router.put('/users/:Id', update_users);
router.delete('/users/:Id', delete_users_byid);
router.get('/users/:Id', get_users_byid);

export default router;