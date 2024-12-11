import { Router } from "express";
import { get_users, post_users, update_users, delete_users_byid, get_users_byid, post_user_img, get_user_img,get_authors, get_user_details, update_user_by_id, get_user_data_byid } from "../controllers/users.controller"
import { verifyJwtToken } from '../middlewares/auth_middleware';
import { verifyRoles } from '../middlewares/role_middleware';

const router = Router();

// router.get('/users', verifyJwtToken, verifyRoles('admin'), get_users);
router.get('/users', get_users);
router.post('/users', post_users);
router.put('/users/:id', update_users);
router.delete('/users/:id', delete_users_byid);
router.get('/users/:id', get_users_byid);

// Datos de usuario
router.get('/user_data/:id', get_user_data_byid);
//Imagen de perfil
router.post('/users/profile_img/:id', post_user_img); 
router.get('/users/profile_img/:id', get_user_img); 
//Autores
 router.get('/authors', get_authors);
//Detalles de usuario
router.get('/user_filter/:searchString', get_user_details);
//Actualizar usuario por id
 router.put('/user_update/:id', update_user_by_id);

export default router;