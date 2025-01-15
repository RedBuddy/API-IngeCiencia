"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _resources = require("../controllers/resources.controller");
var router = (0, _express.Router)();
router.get('/resources', _resources.get_resources);
router.post('/resources', _resources.post_resources);
router.put('/resources/:id', _resources.update_resources);
router["delete"]('/resources/:id', _resources.delete_resources_byid);
router.get('/resources/:id', _resources.get_resources_byid);
// Obtener autor del recurso
router.get('/resources/author/:id', _resources.get_resource_author);
var _default = exports["default"] = router;