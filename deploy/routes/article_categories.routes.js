"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _article_categories = require("../controllers/article_categories.controller");
var router = (0, _express.Router)();
router.get('/article_categories', _article_categories.get_article_categories);
router.post('/article_categories', _article_categories.post_article_categories);
router.put('/article_categories/:id', _article_categories.update_article_categories);
router["delete"]('/article_categories/:id', _article_categories.delete_article_categories_byid);
router.get('/article_categories/:id', _article_categories.get_article_categories_byid);
var _default = exports["default"] = router;