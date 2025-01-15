"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _contacto = require("../controllers/contacto.controller");
var router = (0, _express.Router)();
router.post('/contact', _contacto.sendContactEmail);
var _default = exports["default"] = router;