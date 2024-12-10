import { Router } from "express";
import { get_questions, post_questions, update_questions, delete_questions_byid, get_questions_byid, get_question_author, get_questions_by_userid, deactivate_question_byid } from "../controllers/questions.controller"

const router = Router();

router.get('/questions', get_questions);
router.post('/questions', post_questions);
router.put('/questions/:id', update_questions);
router.delete('/questions/:id', delete_questions_byid);
router.get('/questions/:id', get_questions_byid);
// Obtener autor de la pregunta
router.get('/questions/author/:id', get_question_author);
// Obtener preguntas por id de usuario
router.get('/questions/user_id/:id', get_questions_by_userid);
// Desactivar pregunta
router.delete('/questions/disable/:id', deactivate_question_byid);

export default router;