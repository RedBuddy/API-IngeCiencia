"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_answers = exports.post_answers = exports.get_answers_byid = exports.get_answers_by_questionid = exports.get_answers = exports.delete_answers_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Answers = _interopRequireDefault(require("../database/models/Answers"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var _Questions = _interopRequireDefault(require("../database/models/Questions"));
var post_answers = exports.post_answers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, body, id_question, id_user, question, user, newAnswer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, body = _req$body.body, id_question = _req$body.id_question, id_user = _req$body.id_user; // Verificar que la pregunta y el usuario existan
          _context.next = 4;
          return _Questions["default"].findByPk(id_question);
        case 4:
          question = _context.sent;
          _context.next = 7;
          return _Users["default"].findByPk(id_user);
        case 7:
          user = _context.sent;
          if (question) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'Pregunta no encontrada'
          }));
        case 10:
          if (user) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 12:
          _context.next = 14;
          return _Answers["default"].create({
            body: body,
            id_question: id_question,
            id_user: id_user
          });
        case 14:
          newAnswer = _context.sent;
          res.status(201).json({
            message: 'Respuesta creada exitosamente'
          });
          _context.next = 21;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return function post_answers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_answers = exports.get_answers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var answers;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Answers["default"].findAll();
        case 3:
          answers = _context2.sent;
          res.status(200).json(answers);
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
  return function get_answers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_answers_byid = exports.get_answers_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var answer;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Answers["default"].findByPk(req.params.id);
        case 3:
          answer = _context3.sent;
          if (answer) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Answer not found'
          }));
        case 6:
          res.status(200).json(answer);
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
  return function get_answers_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_answers = exports.update_answers = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _yield$Answer$update, _yield$Answer$update2, updated, updatedAnswer;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Answers["default"].update(req.body, {
            where: {
              id: req.params.id
            }
          });
        case 3:
          _yield$Answer$update = _context4.sent;
          _yield$Answer$update2 = (0, _slicedToArray2["default"])(_yield$Answer$update, 1);
          updated = _yield$Answer$update2[0];
          if (updated) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Answer not found'
          }));
        case 8:
          _context4.next = 10;
          return _Answers["default"].findByPk(req.params.id);
        case 10:
          updatedAnswer = _context4.sent;
          res.status(200).json(updatedAnswer);
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
  return function update_answers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delete_answers_byid = exports.delete_answers_byid = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Answers["default"].destroy({
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
            message: 'Answer not found'
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
  return function delete_answers_byid(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var get_answers_by_questionid = exports.get_answers_by_questionid = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var answers, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Answers["default"].findAll({
            where: {
              id_question: req.params.id
            },
            include: [{
              model: _Users["default"],
              attributes: ['id', 'first_name', 'last_name', 'profile_img']
            }]
          });
        case 3:
          answers = _context6.sent;
          // if (!answers.length) {
          //     return res.status(204).json({ message: 'No se encontraron respuestas para esta pregunta' });
          // }
          result = answers.map(function (answer) {
            return {
              id: answer.id,
              body: answer.body,
              id_question: answer.id_question,
              created_at: answer.created_at,
              user: {
                id: answer.User.id,
                first_name: answer.User.first_name,
                last_name: answer.User.last_name,
                profile_img: answer.User.profile_img
              }
            };
          });
          res.status(200).json(result);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            error: _context6.t0.message
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function get_answers_by_questionid(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();