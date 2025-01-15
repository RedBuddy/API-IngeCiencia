"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user_disciplines = require("../controllers/user_disciplines.controller");
var router = (0, _express.Router)();
router.get('/user_disciplines', _user_disciplines.get_user_disciplines);
router.post('/user_disciplines', _user_disciplines.post_user_disciplines);
router.put('/user_disciplines/:id', _user_disciplines.update_user_disciplines);
router["delete"]('/user_disciplines/:id', _user_disciplines.delete_user_disciplines_byid);
router.get('/user_disciplines/:id', _user_disciplines.get_user_disciplines_byid);
var _default = exports["default"] = router;