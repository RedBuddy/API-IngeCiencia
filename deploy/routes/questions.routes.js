"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _questions = require("../controllers/questions.controller");
var router = (0, _express.Router)();
router.get('/questions', _questions.get_questions);
router.post('/questions', _questions.post_questions);
router.put('/questions/:id', _questions.update_questions);
router["delete"]('/questions/:id', _questions.delete_questions_byid);
router.get('/questions/:id', _questions.get_questions_byid);
// Obtener autor de la pregunta
router.get('/questions/author/:id', _questions.get_question_author);
// Obtener preguntas por id de usuario
router.get('/questions/user_id/:id', _questions.get_questions_by_userid);
// Desactivar pregunta
router["delete"]('/questions/disable/:id', _questions.deactivate_question_byid);
var _default = exports["default"] = router;