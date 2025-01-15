"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _article_views = require("../controllers/article_views.controller");
var router = (0, _express.Router)();
router.get('/article_views', _article_views.get_article_views);
var _default = exports["default"] = router;