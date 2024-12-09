import { Router } from "express";
import { get_questions, post_questions, update_questions, delete_questions_byid, get_questions_byid, get_question_author, get_questions_by_userid } from "../controllers/questions.controller"

const router = Router();

router.get('/questions', get_questions);
router.post('/questions', post_questions);
router.put('/questions/:id', update_questions);
router.delete('/questions/:id', delete_questions_byid);
router.get('/questions/:id', get_questions_byid);

router.get('/questions/author/:id', get_question_author);

router.get('/questions/user_id/:id', get_questions_by_userid);

export default router;