import { Router } from "express";
import { login_users, refresh_token } from "../controllers/auth.controller";
import { verifyJwtToken } from '../middlewares/auth_middleware';
import { verifyRoles } from '../middlewares/role_middleware';

const router = Router();

router.post('/login', login_users);
router.post('/refresh-token', refresh_token);
// router.get('/users', verifyJwtToken, verifyRoles('admin'), get_users);
// // router.get('/users', get_users);
// router.post('/users', post_users);
// router.put('/users/:id', update_users);
// router.delete('/users/:id', delete_users_byid);
// router.get('/users/:id', get_users_byid);

export default router;