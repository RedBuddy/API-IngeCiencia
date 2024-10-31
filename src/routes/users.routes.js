import { Router } from "express";
import { login_users, get_users, post_users, update_users, delete_users_byid, get_users_byid } from "../controllers/users.controller"
import { verifyJwtToken } from '../middlewares/auth_middleware';
import { verifyRoles } from '../middlewares/role_middleware';

const router = Router();

// router.post('/login', login_users);
// router.get('/users', verifyJwtToken, verifyRoles('reader'), get_users);
router.get('/users', get_users);
router.post('/users', post_users);
router.put('/users/:id', update_users);
router.delete('/users/:id', delete_users_byid);
router.get('/users/:id', get_users_byid);

export default router;