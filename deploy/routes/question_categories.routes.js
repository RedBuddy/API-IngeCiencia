"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _question_categories = require("../controllers/question_categories.controller");
var router = (0, _express.Router)();
router.get('/question_categories', _question_categories.get_question_categories);
router.post('/question_categories', _question_categories.post_question_categories);
router.put('/question_categories/:id', _question_categories.update_question_categories);
router["delete"]('/question_categories/:id', _question_categories.delete_question_categories_byid);
router.get('/question_categories/:id', _question_categories.get_question_categories_byid);
var _default = exports["default"] = router;