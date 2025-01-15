"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controllers/users.controller");
var _auth_middleware = require("../middlewares/auth_middleware");
var _role_middleware = require("../middlewares/role_middleware");
var router = (0, _express.Router)();

// router.get('/users', verifyJwtToken, verifyRoles('admin'), get_users);
router.get('/users', _users.get_users);
router.post('/users', _users.post_users);
router.put('/users/:id', _users.update_users);
router["delete"]('/users/:id', _users.delete_users_byid);
router.get('/users/:id', _users.get_users_byid);

// Datos de usuario
router.get('/user_data/:id', _users.get_user_data_byid);
//Imagen de perfil
router.post('/users/profile_img/:id', _users.post_user_img);
router.get('/users/profile_img/:id', _users.get_user_img);
//Autores
router.get('/authors', _users.get_authors);
//Detalles de usuario
router.get('/user_filter/:searchString', _users.get_user_details);
//Actualizar usuario por id
router.put('/user_update/:id', _users.update_user_by_id);
var _default = exports["default"] = router;