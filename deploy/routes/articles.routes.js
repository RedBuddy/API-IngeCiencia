"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _articles = require("../controllers/articles.controller");
var router = (0, _express.Router)();
router.get('/articles', _articles.get_articles);
router.post('/articles', _articles.post_articles);
router.put('/articles/:id', _articles.update_articles);
router["delete"]('/articles/:id', _articles.delete_articles_byid);
router.get('/articles/:id', _articles.get_articles_byid);
router.get('/articles/user_id/:id', _articles.get_articles_by_userid);
router.get('/articles/author/:id', _articles.get_article_author);
//Imagenes 
router.get('/articles/pdf/:id', _articles.get_article_pdf);
router.get('/articles/preview_img/:id', _articles.get_article_preview_img);
//Filtra los articulos por titulo o abstract
router.get('/article_filter/:searchString', _articles.filter_articles);
var _default = exports["default"] = router;