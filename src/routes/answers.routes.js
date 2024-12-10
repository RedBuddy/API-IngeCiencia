import { Router } from "express";
import { get_answers, post_answers, update_answers, delete_answers_byid, get_answers_byid, get_answers_by_questionid } from "../controllers/answers.controller"

const router = Router();

router.get('/answers', get_answers);
router.post('/answers', post_answers);
router.put('/answers/:id', update_answers);
router.delete('/answers/:id', delete_answers_byid);
router.get('/answers/:id', get_answers_byid);
// Obtener respuestas por id de pregunta
router.get('/answers/question/:id', get_answers_by_questionid);

export default router;