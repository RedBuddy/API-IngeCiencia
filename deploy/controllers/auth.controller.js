"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify_email = exports.reset_password = exports.resend_verification_email = exports.request_password_reset = exports.register_user = exports.refresh_token = exports.login_verify_bypass = exports.login_users = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var _Roles = _interopRequireDefault(require("../database/models/Roles"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jwtconfig = require("../jwtconfig");
var _crypto = _interopRequireDefault(require("crypto"));
var _VerifyToken = _interopRequireDefault(require("../database/models/VerifyToken"));
var _email = require("../utils/email");
var _multer = _interopRequireDefault(require("multer"));
// Asegúrate de tener un modelo de Roles

var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});
var login_verify_bypass = exports.login_verify_bypass = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, identifier, password, user, isPasswordValid, token, refreshToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, identifier = _req$body.identifier, password = _req$body.password; // Validación de campos
          if (!(!identifier || !password)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Ingresa el Usuario / Email y la contraseña'
          }));
        case 3:
          _context.prev = 3;
          if (!identifier.includes('@')) {
            _context.next = 10;
            break;
          }
          _context.next = 7;
          return _Users["default"].findOne({
            where: {
              email: identifier
            },
            include: _Roles["default"]
          });
        case 7:
          user = _context.sent;
          _context.next = 13;
          break;
        case 10:
          _context.next = 12;
          return _Users["default"].findOne({
            where: {
              username: identifier
            },
            include: _Roles["default"]
          });
        case 12:
          user = _context.sent;
        case 13:
          if (user) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 15:
          _context.next = 17;
          return _bcrypt["default"].compare(password, user.password);
        case 17:
          isPasswordValid = _context.sent;
          if (isPasswordValid) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: 'Contraseña incorrecta'
          }));
        case 20:
          // Generar un token JWT y un refresh token con los datos del usuario
          token = (0, _jwtconfig.generateToken)({
            user_id: user.id,
            username: user.username,
            role: user.Role.role_name
          });
          _context.next = 23;
          return (0, _jwtconfig.generateRefreshToken)({
            user_id: user.id
          });
        case 23:
          refreshToken = _context.sent;
          res.json({
            message: 'Autenticación exitosa',
            token: token,
            refreshToken: refreshToken
          });
          _context.next = 31;
          break;
        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](3);
          console.error('Error al autenticar usuario:', _context.t0);
          res.status(500).json({
            message: 'Error interno del servidor'
          });
        case 31:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 27]]);
  }));
  return function login_verify_bypass(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var login_users = exports.login_users = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, identifier, password, user, isPasswordValid, token, refreshToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, identifier = _req$body2.identifier, password = _req$body2.password; // Validación de campos
          if (!(!identifier || !password)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Ingresa el Usuario / Email y la contraseña'
          }));
        case 3:
          _context2.prev = 3;
          if (!identifier.includes('@')) {
            _context2.next = 10;
            break;
          }
          _context2.next = 7;
          return _Users["default"].findOne({
            where: {
              email: identifier
            },
            include: _Roles["default"]
          });
        case 7:
          user = _context2.sent;
          _context2.next = 13;
          break;
        case 10:
          _context2.next = 12;
          return _Users["default"].findOne({
            where: {
              username: identifier
            },
            include: _Roles["default"]
          });
        case 12:
          user = _context2.sent;
        case 13:
          if (user) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 15:
          _context2.next = 17;
          return _bcrypt["default"].compare(password, user.password);
        case 17:
          isPasswordValid = _context2.sent;
          if (isPasswordValid) {
            _context2.next = 20;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'Contraseña incorrecta'
          }));
        case 20:
          if (user.verified) {
            _context2.next = 22;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            message: 'Verifica tu correo electrónico antes de iniciar sesión'
          }));
        case 22:
          if (!(user.status === 'inactive')) {
            _context2.next = 24;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'Tu cuenta está inactiva. Contacta al soporte.'
          }));
        case 24:
          // Generar un token JWT y un refresh token con los datos del usuario
          token = (0, _jwtconfig.generateToken)({
            user_id: user.id,
            username: user.username,
            role: user.Role.role_name
          });
          _context2.next = 27;
          return (0, _jwtconfig.generateRefreshToken)({
            user_id: user.id
          });
        case 27:
          refreshToken = _context2.sent;
          res.json({
            message: 'Autenticación exitosa',
            token: token,
            refreshToken: refreshToken
          });
          _context2.next = 35;
          break;
        case 31:
          _context2.prev = 31;
          _context2.t0 = _context2["catch"](3);
          console.error('Error al autenticar usuario:', _context2.t0);
          res.status(500).json({
            message: 'Error interno del servidor'
          });
        case 35:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 31]]);
  }));
  return function login_users(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var refresh_token = exports.refresh_token = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var refreshToken, decoded, user, newAccessToken, newRefreshToken;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          refreshToken = req.body.refreshToken;
          if (refreshToken) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Refresh token es requerido'
          }));
        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return (0, _jwtconfig.verifyRefreshToken)(refreshToken);
        case 6:
          decoded = _context3.sent;
          _context3.next = 9;
          return _Users["default"].findByPk(decoded.user_id, {
            include: _Roles["default"]
          });
        case 9:
          user = _context3.sent;
          if (user) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 12:
          _context3.next = 14;
          return (0, _jwtconfig.invalidateRefreshToken)(refreshToken);
        case 14:
          // Generar nuevos tokens
          newAccessToken = (0, _jwtconfig.generateToken)({
            user_id: user.id,
            username: user.username,
            role: user.Role.role_name
          });
          _context3.next = 17;
          return (0, _jwtconfig.generateRefreshToken)({
            user_id: user.id
          });
        case 17:
          newRefreshToken = _context3.sent;
          res.json({
            token: newAccessToken,
            refreshToken: newRefreshToken
          });
          _context3.next = 25;
          break;
        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](3);
          console.error('Error al refrescar el token:', _context3.t0);
          return _context3.abrupt("return", res.status(401).json({
            message: 'Refresh token inválido o expirado'
          }));
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 21]]);
  }));
  return function refresh_token(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var register_user = exports.register_user = [upload.single('profile_img'),
/*#__PURE__*/
// Middleware para manejar la subida de la imagen de perfil
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body3, username, email, password, first_name, last_name, profile_img, existingUser, existingEmail, hashedPassword, newUser, token, expires_at;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, password = _req$body3.password, first_name = _req$body3.first_name, last_name = _req$body3.last_name;
          profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido
          // Verificar si el username ya existe
          _context4.next = 5;
          return _Users["default"].findOne({
            where: {
              username: username
            }
          });
        case 5:
          existingUser = _context4.sent;
          if (!existingUser) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El nombre de usuario ya está en uso'
          }));
        case 8:
          _context4.next = 10;
          return _Users["default"].findOne({
            where: {
              email: email
            }
          });
        case 10:
          existingEmail = _context4.sent;
          if (!existingEmail) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El correo electrónico ya está en uso'
          }));
        case 13:
          _context4.next = 15;
          return _bcrypt["default"].hash(password, 10);
        case 15:
          hashedPassword = _context4.sent;
          _context4.next = 18;
          return _Users["default"].create({
            username: username,
            email: email,
            password: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            profile_img: profile_img // Almacenar la imagen de perfil en la base de datos
          });
        case 18:
          newUser = _context4.sent;
          // Generar el token de verificación
          token = _crypto["default"].randomBytes(32).toString('hex');
          expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
          // Guardar el token en la base de datos
          _context4.next = 23;
          return _VerifyToken["default"].create({
            id_user: newUser.id,
            token: token,
            expires_at: expires_at
          });
        case 23:
          _context4.next = 25;
          return (0, _email.sendVerificationEmail)(newUser.email, token);
        case 25:
          res.status(201).json({
            message: 'Usuario creado exitosamente. Por favor, verifica tu correo electrónico.'
          });
          _context4.next = 31;
          break;
        case 28:
          _context4.prev = 28;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            error: _context4.t0.message
          });
        case 31:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 28]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()];
var verify_email = exports.verify_email = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var token, verifyToken;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          token = req.query.token; // Buscar el token en la base de datos
          _context5.next = 4;
          return _VerifyToken["default"].findOne({
            where: {
              token: token
            }
          });
        case 4:
          verifyToken = _context5.sent;
          if (verifyToken) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Token inválido o expirado'
          }));
        case 7:
          if (!(verifyToken.expires_at < new Date())) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(410).json({
            message: 'Token expirado'
          }));
        case 9:
          if (!verifyToken.isValid) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(410).json({
            message: 'El token ya ha sido usado'
          }));
        case 11:
          _context5.next = 13;
          return _Users["default"].update({
            verified: true
          }, {
            where: {
              id: verifyToken.id_user
            }
          });
        case 13:
          _context5.next = 15;
          return verifyToken.update({
            isValid: true
          });
        case 15:
          res.status(200).json({
            message: 'Correo electrónico verificado exitosamente'
          });
          _context5.next = 21;
          break;
        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 18]]);
  }));
  return function verify_email(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var resend_verification_email = exports.resend_verification_email = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var email, user, token, expires_at;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          email = req.body.email; // Buscar el usuario por correo electrónico
          _context6.next = 4;
          return _Users["default"].findOne({
            where: {
              email: email
            }
          });
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 7:
          if (!user.verified) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(409).json({
            message: 'El usuario ya está verificado'
          }));
        case 9:
          // Generar un nuevo token de verificación
          token = _crypto["default"].randomBytes(32).toString('hex');
          expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
          // Guardar el nuevo token en la base de datos
          _context6.next = 13;
          return _VerifyToken["default"].create({
            id_user: user.id,
            token: token,
            expires_at: expires_at
          });
        case 13:
          _context6.next = 15;
          return (0, _email.sendVerificationEmail)(user.email, token);
        case 15:
          res.status(200).json({
            message: 'Correo de verificación reenviado exitosamente'
          });
          _context6.next = 21;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            error: _context6.t0.message
          });
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function resend_verification_email(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var request_password_reset = exports.request_password_reset = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var email, user, token, expires_at;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          email = req.body.email; // Buscar el usuario por correo electrónico
          _context7.next = 4;
          return _Users["default"].findOne({
            where: {
              email: email
            }
          });
        case 4:
          user = _context7.sent;
          if (user) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 7:
          // Generar el token de recuperación
          token = _crypto["default"].randomBytes(32).toString('hex');
          expires_at = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora
          // Guardar el token en la base de datos
          _context7.next = 11;
          return _VerifyToken["default"].create({
            id_user: user.id,
            token: token,
            expires_at: expires_at
          });
        case 11:
          _context7.next = 13;
          return (0, _email.sendRecoveryEmail)(user.email, token);
        case 13:
          res.status(200).json({
            message: 'Correo de recuperación enviado exitosamente'
          });
          _context7.next = 19;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            error: _context7.t0.message
          });
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 16]]);
  }));
  return function request_password_reset(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var reset_password = exports.reset_password = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var _req$body4, token, new_password, verifyToken, hashedPassword;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body4 = req.body, token = _req$body4.token, new_password = _req$body4.new_password; // Buscar el token en la base de datos
          _context8.next = 4;
          return _VerifyToken["default"].findOne({
            where: {
              token: token
            }
          });
        case 4:
          verifyToken = _context8.sent;
          if (verifyToken) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Token inválido o expirado'
          }));
        case 7:
          if (!(verifyToken.expires_at < new Date())) {
            _context8.next = 9;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Token expirado'
          }));
        case 9:
          if (!verifyToken.isValid) {
            _context8.next = 11;
            break;
          }
          return _context8.abrupt("return", res.status(410).json({
            message: 'El token ya ha sido usado'
          }));
        case 11:
          _context8.next = 13;
          return _bcrypt["default"].hash(new_password, 10);
        case 13:
          hashedPassword = _context8.sent;
          _context8.next = 16;
          return _Users["default"].update({
            password: hashedPassword
          }, {
            where: {
              id: verifyToken.id_user
            }
          });
        case 16:
          _context8.next = 18;
          return verifyToken.update({
            isValid: true
          });
        case 18:
          res.status(200).json({
            message: 'Contraseña restablecida exitosamente'
          });
          _context8.next = 24;
          break;
        case 21:
          _context8.prev = 21;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            error: _context8.t0.message
          });
        case 24:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 21]]);
  }));
  return function reset_password(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();