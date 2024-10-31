import { Router } from "express";
import { get_profiles, post_profile, update_profile, delete_profile_byid, get_profile_byid } from "../controllers/profile.controller"

const router = Router();

router.get('/profile', get_profiles);
router.post('/profile', post_profile);
router.put('/profile/:id', update_profile);
router.delete('/profile/:id', delete_profile_byid);
router.get('/profile/:id', get_profile_byid);

export default router;