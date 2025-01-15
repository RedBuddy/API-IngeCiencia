"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = require("../controllers/auth.controller");
var _auth_middleware = require("../middlewares/auth_middleware");
var _role_middleware = require("../middlewares/role_middleware");
var _faker = require("@faker-js/faker");
var router = (0, _express.Router)();
router.post('/login', _auth.login_users);
router.post('/login-bypass', _auth.login_verify_bypass);
router.post('/refresh-token', _auth.refresh_token);
router.post('/register', _auth.register_user);
router.get('/verify-email', _auth.verify_email);
router.post('/resend-verification-email', _auth.resend_verification_email);
router.post('/request-password-reset', _auth.request_password_reset);
router.post('/reset-password', _auth.reset_password);

// router.get('/users', verifyJwtToken, verifyRoles('admin'), get_users);
// // router.get('/users', get_users);
// router.post('/users', post_users);
// router.put('/users/:id', update_users);
// router.delete('/users/:id', delete_users_byid);
// router.get('/users/:id', get_users_byid);
var _default = exports["default"] = router;