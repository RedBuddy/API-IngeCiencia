"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_categories = exports.post_categories = exports.get_categories_byid = exports.get_categories = exports.delete_categories_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Categories = _interopRequireDefault(require("../database/models/Categories"));
var post_categories = exports.post_categories = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var category_name, newCategory;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          category_name = req.body.category_name; // Crear la nueva categoría
          _context.next = 4;
          return _Categories["default"].create({
            category_name: category_name
          });
        case 4:
          newCategory = _context.sent;
          res.status(201).json(newCategory);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function post_categories(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_categories = exports.get_categories = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var categories;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Categories["default"].findAll();
        case 3:
          categories = _context2.sent;
          res.status(200).json(categories);
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
  return function get_categories(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_categories_byid = exports.get_categories_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Categories["default"].findByPk(req.params.id);
        case 3:
          category = _context3.sent;
          if (category) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Category not found'
          }));
        case 6:
          res.status(200).json(category);
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
  return function get_categories_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_categories = exports.update_categories = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var category_name, _yield$Category$updat, _yield$Category$updat2, updated, updatedCategory;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          category_name = req.body.category_name;
          _context4.next = 4;
          return _Categories["default"].update({
            category_name: category_name
          }, {
            where: {
              id: req.params.id
            }
          });
        case 4:
          _yield$Category$updat = _context4.sent;
          _yield$Category$updat2 = (0, _slicedToArray2["default"])(_yield$Category$updat, 1);
          updated = _yield$Category$updat2[0];
          if (updated) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Category not found'
          }));
        case 9:
          _context4.next = 11;
          return _Categories["default"].findByPk(req.params.id);
        case 11:
          updatedCategory = _context4.sent;
          res.status(200).json(updatedCategory);
          _context4.next = 18;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            error: _context4.t0.message
          });
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function update_categories(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delete_categories_byid = exports.delete_categories_byid = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Categories["default"].destroy({
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
            message: 'Category not found'
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
  return function delete_categories_byid(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();