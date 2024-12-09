import { Router } from "express";
import { get_question_categories, post_question_categories, update_question_categories, delete_question_categories_byid, get_question_categories_byid } from "../controllers/question_categories.controller"

const router = Router();

router.get('/question_categories', get_question_categories);
router.post('/question_categories', post_question_categories);
router.put('/question_categories/:id', update_question_categories);
router.delete('/question_categories/:id', delete_question_categories_byid);
router.get('/question_categories/:id', get_question_categories_byid);

export default router;