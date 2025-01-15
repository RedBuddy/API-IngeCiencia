"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_resources = exports.post_resources = exports.get_resources_byid = exports.get_resources = exports.get_resource_author = exports.delete_resources_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Resources = _interopRequireDefault(require("../database/models/Resources"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var _multer = _interopRequireDefault(require("multer"));
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});
var post_resources = exports.post_resources = [upload.single('pdf'),
/*#__PURE__*/
// Middleware para manejar la subida del archivo PDF
function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, description, resource_category, link, id_author, pdf, newResource;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, resource_category = _req$body.resource_category, link = _req$body.link, id_author = _req$body.id_author;
          pdf = req.file ? req.file.buffer : null; // Obtener el archivo PDF subido
          // Crear el nuevo recurso
          _context.next = 5;
          return _Resources["default"].create({
            title: title,
            description: description,
            resource_category: resource_category,
            link: link,
            id_author: id_author,
            pdf: pdf // Almacenar el archivo PDF en la base de datos
          });
        case 5:
          newResource = _context.sent;
          res.status(201).json(newResource);
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()];
var get_resources = exports.get_resources = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var resources;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Resources["default"].findAll();
        case 3:
          resources = _context2.sent;
          res.status(200).json(resources);
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
  return function get_resources(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_resources_byid = exports.get_resources_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var resource;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Resources["default"].findByPk(req.params.id);
        case 3:
          resource = _context3.sent;
          if (resource) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Recurso no encontrado'
          }));
        case 6:
          res.status(200).json(resource);
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
  return function get_resources_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_resources = exports.update_resources = [upload.single('pdf'),
/*#__PURE__*/
// Middleware para manejar la subida del archivo PDF
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, title, description, resource_category, link, pdf, resource;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, resource_category = _req$body2.resource_category, link = _req$body2.link;
          pdf = req.file ? req.file.buffer : null; // Obtener el archivo PDF subido
          // Verificar si el recurso existe
          _context4.next = 6;
          return _Resources["default"].findByPk(id);
        case 6:
          resource = _context4.sent;
          if (resource) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Recurso no encontrado'
          }));
        case 9:
          _context4.next = 11;
          return resource.update({
            title: title,
            description: description,
            resource_category: resource_category,
            link: link,
            pdf: pdf || resource.pdf // Mantener el archivo PDF existente si no se proporciona uno nuevo
          });
        case 11:
          res.status(200).json(resource);
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
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()];
var delete_resources_byid = exports.delete_resources_byid = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Resources["default"].destroy({
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
            message: 'Recurso no encontrado'
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
  return function delete_resources_byid(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var get_resource_author = exports.get_resource_author = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, resource, author;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return _Resources["default"].findOne({
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
          resource = _context6.sent;
          if (resource) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Recurso no encontrado'
          }));
        case 7:
          author = resource.User;
          res.status(200).json({
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
  return function get_resource_author(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();