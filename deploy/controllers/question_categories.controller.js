"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_question_categories = exports.post_question_categories = exports.get_question_categories_byid = exports.get_question_categories = exports.delete_question_categories_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _QuestionCategoriesMap = _interopRequireDefault(require("../database/models/QuestionCategoriesMap"));
var _Questions = _interopRequireDefault(require("../database/models/Questions"));
var _Categories = _interopRequireDefault(require("../database/models/Categories"));
// Asegúrate de que las asociaciones estén configuradas correctamente
_QuestionCategoriesMap["default"].belongsTo(_Questions["default"], {
  foreignKey: 'id_question'
});
_QuestionCategoriesMap["default"].belongsTo(_Categories["default"], {
  foreignKey: 'id_category'
});
var post_question_categories = exports.post_question_categories = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, id_question, id_category, question, category, existingEntry, newMapping;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, id_question = _req$body.id_question, id_category = _req$body.id_category; // Verificar que la pregunta y la categoría existan
          _context.next = 4;
          return _Questions["default"].findByPk(id_question);
        case 4:
          question = _context.sent;
          _context.next = 7;
          return _Categories["default"].findByPk(id_category);
        case 7:
          category = _context.sent;
          if (!(!question || !category)) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'Question or Category not found'
          }));
        case 10:
          _context.next = 12;
          return _QuestionCategoriesMap["default"].findOne({
            where: {
              id_question: id_question,
              id_category: id_category
            }
          });
        case 12:
          existingEntry = _context.sent;
          if (!existingEntry) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            error: 'Duplicate entry: Question category already exists'
          }));
        case 15:
          _context.next = 17;
          return _QuestionCategoriesMap["default"].create({
            id_question: id_question,
            id_category: id_category
          });
        case 17:
          newMapping = _context.sent;
          res.status(201).json(newMapping);
          _context.next = 24;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 21]]);
  }));
  return function post_question_categories(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_question_categories = exports.get_question_categories = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var mappings;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _QuestionCategoriesMap["default"].findAll({
            include: [{
              model: _Questions["default"],
              attributes: ['title']
            }, {
              model: _Categories["default"],
              attributes: ['category_name']
            }]
          });
        case 3:
          mappings = _context2.sent;
          res.status(200).json(mappings);
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
  return function get_question_categories(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_question_categories_byid = exports.get_question_categories_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var mappings, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _QuestionCategoriesMap["default"].findAll({
            where: {
              id_question: req.params.id
            },
            include: [{
              model: _Questions["default"],
              attributes: ['title']
            }, {
              model: _Categories["default"],
              attributes: ['category_name']
            }]
          });
        case 3:
          mappings = _context3.sent;
          result = {
            id_question: req.params.id,
            id_categories: mappings.map(function (qc) {
              return qc.id_category;
            })
          };
          res.status(200).json(result);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            error: _context3.t0.message
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function get_question_categories_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_question_categories = exports.update_question_categories = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, id_question, id_categories, newQuestionCategories, updatedQuestionCategories;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, id_question = _req$body2.id_question, id_categories = _req$body2.id_categories;
          _context5.prev = 1;
          _context5.next = 4;
          return _QuestionCategoriesMap["default"].destroy({
            where: {
              id_question: id_question
            }
          });
        case 4:
          _context5.next = 6;
          return Promise.all(id_categories.map( /*#__PURE__*/function () {
            var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id_category) {
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _QuestionCategoriesMap["default"].create({
                      id_question: id_question,
                      id_category: id_category
                    });
                  case 2:
                    return _context4.abrupt("return", _context4.sent);
                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x9) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 6:
          newQuestionCategories = _context5.sent;
          _context5.next = 9;
          return _QuestionCategoriesMap["default"].findAll({
            where: {
              id_question: id_question
            },
            include: [{
              model: _Questions["default"],
              attributes: ['title']
            }, {
              model: _Categories["default"],
              attributes: ['category_name']
            }]
          });
        case 9:
          updatedQuestionCategories = _context5.sent;
          res.status(200).json(updatedQuestionCategories);
          _context5.next = 16;
          break;
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](1);
          res.status(400).json({
            error: _context5.t0.message
          });
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 13]]);
  }));
  return function update_question_categories(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delete_question_categories_byid = exports.delete_question_categories_byid = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _QuestionCategoriesMap["default"].destroy({
            where: {
              id_question: req.params.id,
              id_category: req.body.id_category
            }
          });
        case 3:
          deleted = _context6.sent;
          if (deleted) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Question category not found'
          }));
        case 6:
          res.status(204).json();
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            error: _context6.t0.message
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function delete_question_categories_byid(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();