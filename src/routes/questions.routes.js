import { Router } from "express";
import { get_questions, post_questions, update_questions, delete_questions_byid, get_questions_byid } from "../controllers/questions.controller"

const router = Router();

router.get('/questions', get_questions);
router.post('/questions', post_questions);
router.put('/questions/:Id', update_questions);
router.delete('/questions/:Id', delete_questions_byid);
router.get('/questions/:Id', get_questions_byid);

export default router;