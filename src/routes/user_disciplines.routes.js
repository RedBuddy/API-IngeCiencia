import { Router } from "express";
import { get_user_disciplines, post_user_disciplines, update_user_disciplines, delete_user_disciplines_byid, get_user_disciplines_byid } from "../controllers/user_disciplines.controller"

const router = Router();

router.get('/user_disciplines', get_user_disciplines);
router.post('/user_disciplines', post_user_disciplines);
router.put('/user_disciplines/:id', update_user_disciplines);
router.delete('/user_disciplines/:id', delete_user_disciplines_byid);
router.get('/user_disciplines/:id', get_user_disciplines_byid);

export default router;