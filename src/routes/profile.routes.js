import { Router } from "express";
import { get_profiles, post_profile, update_profile, delete_profile_byid, get_profile_byid, get_user_card, get_user_about, get_researchers_details, get_admin_profile } from "../controllers/profile.controller"

const router = Router();

router.get('/profile', get_profiles);
router.post('/profile', post_profile);
router.put('/profile/:id', update_profile);
router.delete('/profile/:id', delete_profile_byid);
router.get('/profile/:id', get_profile_byid);

router.get('/profile_card/:id', get_user_card);
router.get('/profile_about/:id', get_user_about);

 //Obtener investigadores
 router.get('/authors_profile', get_researchers_details);

 //Obtener admins para contacto
router.get('/admins_profile', get_admin_profile);

export default router;