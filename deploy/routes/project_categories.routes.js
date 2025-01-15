"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _project_categories = require("../controllers/project_categories.controller");
var router = (0, _express.Router)();
router.get('/project_categories', _project_categories.get_project_categories);
router.post('/project_categories', _project_categories.post_project_categories);
router.put('/project_categories/:id', _project_categories.update_project_categories);
router["delete"]('/project_categories/:id', _project_categories.delete_project_categories_byid);
router.get('/project_categories/:id', _project_categories.get_project_categories_byid);
var _default = exports["default"] = router;