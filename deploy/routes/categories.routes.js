"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _categories = require("../controllers/categories.controller");
var router = (0, _express.Router)();
router.get('/categories', _categories.get_categories);
router.post('/categories', _categories.post_categories);
router.put('/categories/:id', _categories.update_categories);
router["delete"]('/categories/:id', _categories.delete_categories_byid);
router.get('/categories/:id', _categories.get_categories_byid);
var _default = exports["default"] = router;