"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_resource_coauthors = exports.post_resource_coauthors = exports.get_resource_coauthors_byid = exports.get_resource_coauthors = exports.delete_resource_coauthors_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ResourceCoauthorsMap = _interopRequireDefault(require("../database/models/ResourceCoauthorsMap"));
var _Resources = _interopRequireDefault(require("../database/models/Resources"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
// Asegúrate de que las asociaciones estén configuradas correctamente
_ResourceCoauthorsMap["default"].belongsTo(_Resources["default"], {
  foreignKey: 'id_resource'
});
_ResourceCoauthorsMap["default"].belongsTo(_Users["default"], {
  foreignKey: 'id_coauthor'
});
var post_resource_coauthors = exports.post_resource_coauthors = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var existingEntry, newCoauthor;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _ResourceCoauthorsMap["default"].findOne({
            where: {
              id_resource: req.body.id_resource,
              id_coauthor: req.body.id_coauthor
            }
          });
        case 3:
          existingEntry = _context.sent;
          if (!existingEntry) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            error: 'Duplicate entry: Resource coauthor already exists'
          }));
        case 6:
          _context.next = 8;
          return _ResourceCoauthorsMap["default"].create({
            id_resource: req.body.id_resource,
            id_coauthor: req.body.id_coauthor
          });
        case 8:
          newCoauthor = _context.sent;
          res.status(201).json(newCoauthor);
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function post_resource_coauthors(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_resource_coauthors = exports.get_resource_coauthors = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var coauthors;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _ResourceCoauthorsMap["default"].findAll({
            include: [{
              model: _Resources["default"],
              attributes: ['title']
            }, {
              model: _Users["default"],
              attributes: ['username', 'email']
            }]
          });
        case 3:
          coauthors = _context2.sent;
          res.status(200).json(coauthors);
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
  return function get_resource_coauthors(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_resource_coauthors_byid = exports.get_resource_coauthors_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var coauthors, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _ResourceCoauthorsMap["default"].findAll({
            where: {
              id_resource: req.params.id
            },
            include: [{
              model: _Resources["default"],
              attributes: ['title']
            }, {
              model: _Users["default"],
              attributes: ['username', 'email']
            }]
          });
        case 3:
          coauthors = _context3.sent;
          result = {
            id_resource: req.params.id,
            id_coauthors: coauthors.map(function (rc) {
              return rc.id_coauthor;
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
  return function get_resource_coauthors_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_resource_coauthors = exports.update_resource_coauthors = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, id_resource, id_coauthors, newResourceCoauthors, updatedResourceCoauthors;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, id_resource = _req$body.id_resource, id_coauthors = _req$body.id_coauthors;
          _context5.prev = 1;
          _context5.next = 4;
          return _ResourceCoauthorsMap["default"].destroy({
            where: {
              id_resource: id_resource
            }
          });
        case 4:
          _context5.next = 6;
          return Promise.all(id_coauthors.map( /*#__PURE__*/function () {
            var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id_coauthor) {
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _ResourceCoauthorsMap["default"].create({
                      id_resource: id_resource,
                      id_coauthor: id_coauthor
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
          newResourceCoauthors = _context5.sent;
          _context5.next = 9;
          return _ResourceCoauthorsMap["default"].findAll({
            where: {
              id_resource: id_resource
            },
            include: [{
              model: _Resources["default"],
              attributes: ['title']
            }, {
              model: _Users["default"],
              attributes: ['username', 'email']
            }]
          });
        case 9:
          updatedResourceCoauthors = _context5.sent;
          res.status(200).json(updatedResourceCoauthors);
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
  return function update_resource_coauthors(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delete_resource_coauthors_byid = exports.delete_resource_coauthors_byid = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _ResourceCoauthorsMap["default"].destroy({
            where: {
              id_resource: req.params.id,
              id_coauthor: req.body.id_coauthor
            }
          });
        case 3:
          deleted = _context6.sent;
          if (deleted) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Resource coauthor not found'
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
  return function delete_resource_coauthors_byid(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();