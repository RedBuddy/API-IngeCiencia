"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _resource_coauthors = require("../controllers/resource_coauthors.controller");
var router = (0, _express.Router)();
router.get('/resource_coauthors', _resource_coauthors.get_resource_coauthors);
router.post('/resource_coauthors', _resource_coauthors.post_resource_coauthors);
router.put('/resource_coauthors/:id', _resource_coauthors.update_resource_coauthors);
router["delete"]('/resource_coauthors/:id', _resource_coauthors.delete_resource_coauthors_byid);
router.get('/resource_coauthors/:id', _resource_coauthors.get_resource_coauthors_byid);
var _default = exports["default"] = router;