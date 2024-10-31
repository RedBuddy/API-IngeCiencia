import { Router } from "express";
import { get_question_categories, post_question_categories, update_question_categories, delete_question_categories_byid, get_question_categories_byid } from "../controllers/question_categories.controller"

const router = Router();

router.get('/answers', get_question_categories);
router.post('/answers', post_question_categories);
router.put('/answers/:id', update_question_categories);
router.delete('/answers/:id', delete_question_categories_byid);
router.get('/answers/:id', get_question_categories_byid);

export default router;