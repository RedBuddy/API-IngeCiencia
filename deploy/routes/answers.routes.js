"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _answers = require("../controllers/answers.controller");
var router = (0, _express.Router)();
router.get('/answers', _answers.get_answers);
router.post('/answers', _answers.post_answers);
router.put('/answers/:id', _answers.update_answers);
router["delete"]('/answers/:id', _answers.delete_answers_byid);
router.get('/answers/:id', _answers.get_answers_byid);
// Obtener respuestas por id de pregunta
router.get('/answers/question/:id', _answers.get_answers_by_questionid);
var _default = exports["default"] = router;