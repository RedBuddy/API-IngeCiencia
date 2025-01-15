"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.verifyRefreshToken = exports.invalidateRefreshToken = exports.generateToken = exports.generateRefreshToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _RefreshToken = _interopRequireDefault(require("./database/models/RefreshToken"));
// Clave secreta para firmar el token (debería estar en una variable de entorno)
var JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
var JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret_key';

// Función para generar un token JWT
var generateToken = exports.generateToken = function generateToken(user) {
  return _jsonwebtoken["default"].sign(user, JWT_SECRET, {
    expiresIn: '1h'
  });
};

// Función para generar un refresh token
var generateRefreshToken = exports.generateRefreshToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var token, expiresAt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = _jsonwebtoken["default"].sign(user, JWT_REFRESH_SECRET, {
            expiresIn: '24h'
          });
          expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 1);
          _context.next = 5;
          return _RefreshToken["default"].create({
            token: token,
            id_user: user.user_id,
            expires_at: expiresAt
          });
        case 5:
          return _context.abrupt("return", token);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function generateRefreshToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Función para verificar un token JWT
var verifyToken = exports.verifyToken = function verifyToken(token) {
  return _jsonwebtoken["default"].verify(token, JWT_SECRET);
};

// Función para verificar un refresh token
var verifyRefreshToken = exports.verifyRefreshToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
    var decoded, storedToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          decoded = _jsonwebtoken["default"].verify(token, JWT_REFRESH_SECRET);
          _context2.next = 3;
          return _RefreshToken["default"].findOne({
            where: {
              token: token,
              isValid: true
            }
          });
        case 3:
          storedToken = _context2.sent;
          if (storedToken) {
            _context2.next = 6;
            break;
          }
          throw new Error('Refresh token inválido o expirado');
        case 6:
          return _context2.abrupt("return", decoded);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function verifyRefreshToken(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// Función para invalidar un refresh token
var invalidateRefreshToken = exports.invalidateRefreshToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(token) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _RefreshToken["default"].update({
            isValid: false
          }, {
            where: {
              token: token
            }
          });
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function invalidateRefreshToken(_x3) {
    return _ref3.apply(this, arguments);
  };
}();