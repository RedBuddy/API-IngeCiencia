"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRoles = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var verifyRoles = exports.verifyRoles = function verifyRoles() {
  for (var _len = arguments.length, allowedRoles = new Array(_len), _key = 0; _key < _len; _key++) {
    allowedRoles[_key] = arguments[_key];
  }
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var role;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            role = req.user.role; // Obtener el nombre del rol del usuario
            // Verificar si role está definido
            if (role) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", res.status(403).json({
              message: 'Acceso denegado: Rol no definido'
            }));
          case 3:
            if (allowedRoles.includes(role)) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", res.status(403).json({
              message: 'Acceso denegado: No tienes permisos suficientes'
            }));
          case 5:
            next();
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};