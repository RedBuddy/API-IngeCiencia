"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _article_coauthors = require("../controllers/article_coauthors.controller");
var router = (0, _express.Router)();
router.get('/article_coauthors', _article_coauthors.get_article_coauthors);
router.post('/article_coauthors', _article_coauthors.post_article_coauthors);
router.put('/article_coauthors/:id', _article_coauthors.update_article_coauthors);
router["delete"]('/article_coauthors/:id', _article_coauthors.delete_article_coauthors_byid);
router.get('/article_coauthors/:id', _article_coauthors.get_article_coauthors_byid);
var _default = exports["default"] = router;