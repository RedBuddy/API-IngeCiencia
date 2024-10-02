import { Router } from "express";
import { get_answers, post_answers, update_answers, delete_answers_byid, get_answers_byid } from "../controllers/answers.controller"

const router = Router();

router.get('/answers', get_answers);
router.post('/answers', post_answers);
router.put('/answers/:Id', update_answers);
router.delete('/answers/:Id', delete_answers_byid);
router.get('/answers/:Id', get_answers_byid);

export default router;