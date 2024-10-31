import { Router } from "express";
import { get_questions, post_questions, update_questions, delete_questions_byid, get_questions_byid } from "../controllers/questions.controller"

const router = Router();

router.get('/questions', get_questions);
router.post('/questions', post_questions);
router.put('/questions/:id', update_questions);
router.delete('/questions/:id', delete_questions_byid);
router.get('/questions/:id', get_questions_byid);

export default router;