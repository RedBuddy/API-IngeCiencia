"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _profile = require("../controllers/profile.controller");
var router = (0, _express.Router)();
router.get('/profile', _profile.get_profiles);
router.post('/profile', _profile.post_profile);
router.put('/profile/:id', _profile.update_profile);
router["delete"]('/profile/:id', _profile.delete_profile_byid);
router.get('/profile/:id', _profile.get_profile_byid);
router.get('/profile_card/:id', _profile.get_user_card);
router.get('/profile_about/:id', _profile.get_user_about);

//Obtener investigadores
router.get('/authors_profile', _profile.get_researchers_details);

//Obtener admins para contacto
router.get('/admins_profile', _profile.get_admin_profile);
var _default = exports["default"] = router;