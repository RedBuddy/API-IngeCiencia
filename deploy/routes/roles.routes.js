"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _roles = require("../controllers/roles.controller");
var router = (0, _express.Router)();
router.get('/roles', _roles.get_roles);
router.post('/roles', _roles.post_roles);
router.put('/roles/:id', _roles.update_roles);
router["delete"]('/roles/:id', _roles.delete_roles_byid);
router.get('/roles/:id', _roles.get_roles_byid);
var _default = exports["default"] = router;