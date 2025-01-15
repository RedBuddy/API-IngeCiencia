"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_questions = exports.post_questions = exports.get_questions_byid = exports.get_questions_by_userid = exports.get_questions = exports.get_question_author = exports.delete_questions_byid = exports.deactivate_question_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Questions = _interopRequireDefault(require("../database/models/Questions"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var post_questions = exports.post_questions = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, body, id_user, newQuestion;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, title = _req$body.title, body = _req$body.body, id_user = _req$body.id_user; // Crear la nueva pregunta
          _context.next = 4;
          return _Questions["default"].create({
            title: title,
            body: body,
            id_user: id_user
          });
        case 4:
          newQuestion = _context.sent;
          res.status(201).json(newQuestion);
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
  return function post_questions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_questions = exports.get_questions = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var questions;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Questions["default"].findAll();
        case 3:
          questions = _context2.sent;
          if (questions.length) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'No se encontraron preguntas'
          }));
        case 6:
          res.status(200).json(questions);
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            error: _context2.t0.message
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function get_questions(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_questions_byid = exports.get_questions_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var question;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Questions["default"].findByPk(req.params.id);
        case 3:
          question = _context3.sent;
          if (question) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Pregunta no encontrada'
          }));
        case 6:
          res.status(200).json(question);
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
  return function get_questions_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_questions = exports.update_questions = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _yield$Question$updat, _yield$Question$updat2, updated, updatedQuestion;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Questions["default"].update(req.body, {
            where: {
              id: req.params.id
            }
          });
        case 3:
          _yield$Question$updat = _context4.sent;
          _yield$Question$updat2 = (0, _slicedToArray2["default"])(_yield$Question$updat, 1);
          updated = _yield$Question$updat2[0];
          if (updated) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Pregunta no encontrada'
          }));
        case 8:
          _context4.next = 10;
          return _Questions["default"].findByPk(req.params.id);
        case 10:
          updatedQuestion = _context4.sent;
          res.status(200).json(updatedQuestion);
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
  return function update_questions(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delete_questions_byid = exports.delete_questions_byid = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Questions["default"].destroy({
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
            message: 'Pregunta no encontrada'
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
  return function delete_questions_byid(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var get_question_author = exports.get_question_author = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, question, author;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return _Questions["default"].findOne({
            where: {
              id: id
            },
            attributes: [],
            include: [{
              model: _Users["default"],
              attributes: ['id', 'first_name', 'last_name', 'profile_img']
            }]
          });
        case 4:
          question = _context6.sent;
          if (question) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Pregunta no encontrada'
          }));
        case 7:
          author = question.User;
          res.status(200).json({
            id: author.id,
            first_name: author.first_name,
            last_name: author.last_name,
            profile_img: author.profile_img
          });
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            error: _context6.t0.message
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function get_question_author(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var get_questions_by_userid = exports.get_questions_by_userid = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var questions;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _Questions["default"].findAll({
            where: {
              id_user: req.params.id
            }
          });
        case 3:
          questions = _context7.sent;
          if (questions.length) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'No se encontraron preguntas para este usuario'
          }));
        case 6:
          res.status(200).json(questions);
          _context7.next = 12;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            error: _context7.t0.message
          });
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function get_questions_by_userid(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var deactivate_question_byid = exports.deactivate_question_byid = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var _yield$Question$updat3, _yield$Question$updat4, updated, updatedQuestion;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _Questions["default"].update({
            active: false
          }, {
            where: {
              id: req.params.id
            }
          });
        case 3:
          _yield$Question$updat3 = _context8.sent;
          _yield$Question$updat4 = (0, _slicedToArray2["default"])(_yield$Question$updat3, 1);
          updated = _yield$Question$updat4[0];
          if (updated) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Pregunta no encontrada'
          }));
        case 8:
          _context8.next = 10;
          return _Questions["default"].findByPk(req.params.id);
        case 10:
          updatedQuestion = _context8.sent;
          res.status(200).json({
            message: 'Pregunta desactivada'
          });
          _context8.next = 17;
          break;
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            error: _context8.t0.message
          });
        case 17:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 14]]);
  }));
  return function deactivate_question_byid(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();