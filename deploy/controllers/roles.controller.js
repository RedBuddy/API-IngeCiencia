"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_roles = exports.post_roles = exports.get_roles_byid = exports.get_roles = exports.delete_roles_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Roles = _interopRequireDefault(require("../database/models/Roles"));
var post_roles = exports.post_roles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newRole;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _Roles["default"].create({
            name: req.body.name,
            description: req.body.description
          });
        case 3:
          newRole = _context.sent;
          res.status(201).json(newRole);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function post_roles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_roles = exports.get_roles = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var roles;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Roles["default"].findAll();
        case 3:
          roles = _context2.sent;
          res.status(200).json(roles);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            error: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function get_roles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_roles_byid = exports.get_roles_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var role;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Roles["default"].findByPk(req.params.id);
        case 3:
          role = _context3.sent;
          if (role) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Role not found'
          }));
        case 6:
          res.status(200).json(role);
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            error: _context3.t0.message
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function get_roles_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_roles = exports.update_roles = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _yield$Role$update, _yield$Role$update2, updated, updatedRole;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Roles["default"].update(req.body, {
            where: {
              id: req.params.id
            }
          });
        case 3:
          _yield$Role$update = _context4.sent;
          _yield$Role$update2 = (0, _slicedToArray2["default"])(_yield$Role$update, 1);
          updated = _yield$Role$update2[0];
          if (updated) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Role not found'
          }));
        case 8:
          _context4.next = 10;
          return _Roles["default"].findByPk(req.params.id);
        case 10:
          updatedRole = _context4.sent;
          res.status(200).json(updatedRole);
          _context4.next = 17;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            error: _context4.t0.message
          });
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function update_roles(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delete_roles_byid = exports.delete_roles_byid = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Roles["default"].destroy({
            where: {
              id: req.params.id
            }
          });
        case 3:
          deleted = _context5.sent;
          if (deleted) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Role not found'
          }));
        case 6:
          res.status(204).json();
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function delete_roles_byid(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();