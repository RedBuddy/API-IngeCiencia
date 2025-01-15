"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _research_projects = require("../controllers/research_projects.controller");
var router = (0, _express.Router)();
router.get('/research_projects', _research_projects.get_research_projects);
router.post('/research_projects', _research_projects.post_research_projects);
router.put('/research_projects/:id', _research_projects.update_research_projects);
router["delete"]('/research_projects/:id', _research_projects.delete_research_projects_byid);
router.get('/research_projects/:id', _research_projects.get_research_projects_byid);
// Obtener proyectos por id de usuario
router.get('/research_projects/user_id/:id', _research_projects.get_projects_by_userid);
// //Filtra los proyectos por titulo o detalles
router.get('/project_filter/:searchString', _research_projects.filter_research_projects);
router.get('/research_projects/author/:id', _research_projects.get_research_project_author);
var _default = exports["default"] = router;