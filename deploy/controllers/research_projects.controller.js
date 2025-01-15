"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_research_projects = exports.post_research_projects = exports.get_research_projects_byid = exports.get_research_projects = exports.get_research_project_author = exports.get_projects_by_userid = exports.filter_research_projects = exports.delete_research_projects_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ResearchProjects = _interopRequireDefault(require("../database/models/ResearchProjects"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var _multer = _interopRequireDefault(require("multer"));
var _sequelize = require("sequelize");
// Configurar multer para manejar la subida de archivos
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});
var post_research_projects = exports.post_research_projects = [upload.single('preview_img'),
/*#__PURE__*/
// Middleware para manejar la subida de la imagen de vista previa
function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, id_author, title, details, vacancies, status, preview_img, newProject;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, id_author = _req$body.id_author, title = _req$body.title, details = _req$body.details, vacancies = _req$body.vacancies, status = _req$body.status;
          preview_img = req.file ? req.file.buffer : null; // Obtener la imagen de vista previa subida
          // Crear el nuevo proyecto de investigación
          _context.next = 5;
          return _ResearchProjects["default"].create({
            id_author: id_author,
            title: title,
            details: details,
            vacancies: vacancies,
            preview_img: preview_img,
            // Almacenar la imagen de vista previa en la base de datos
            status: status
          });
        case 5:
          newProject = _context.sent;
          res.status(201).json(newProject);
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
var get_research_projects = exports.get_research_projects = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var projects;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _ResearchProjects["default"].findAll({
            include: [{
              model: _Users["default"],
              attributes: ['username', 'first_name', 'last_name']
            }]
          });
        case 3:
          projects = _context2.sent;
          res.status(200).json(projects);
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
  return function get_research_projects(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_research_projects_byid = exports.get_research_projects_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var project;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _ResearchProjects["default"].findByPk(req.params.id, {
            include: [{
              model: _Users["default"],
              attributes: ['username', 'first_name', 'last_name']
            }]
          });
        case 3:
          project = _context3.sent;
          if (project) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Research project not found'
          }));
        case 6:
          res.status(200).json(project);
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
  return function get_research_projects_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var get_projects_by_userid = exports.get_projects_by_userid = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var projects;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _ResearchProjects["default"].findAll({
            where: {
              id_author: req.params.id
            }
          });
        case 3:
          projects = _context4.sent;
          // if (!projects.length) {
          //     return res.status(204).json({ message: 'No se encontraron proyectos de investigación para este usuario' });
          // }

          res.status(200).json(projects);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            error: _context4.t0.message
          });
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function get_projects_by_userid(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var update_research_projects = exports.update_research_projects = [upload.single('preview_img'),
/*#__PURE__*/
// Middleware para manejar la subida de la imagen de vista previa
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, id_author, title, details, vacancies, status, preview_img, project;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, id_author = _req$body2.id_author, title = _req$body2.title, details = _req$body2.details, vacancies = _req$body2.vacancies, status = _req$body2.status;
          preview_img = req.file ? req.file.buffer : null; // Obtener la imagen de vista previa subida
          // Verificar si el proyecto de investigación existe
          _context5.next = 6;
          return _ResearchProjects["default"].findByPk(id);
        case 6:
          project = _context5.sent;
          if (project) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Research project not found'
          }));
        case 9:
          _context5.next = 11;
          return project.update({
            id_author: id_author,
            title: title,
            details: details,
            vacancies: vacancies,
            preview_img: preview_img || project.preview_img,
            // Mantener la imagen de vista previa existente si no se proporciona una nueva
            status: status
          });
        case 11:
          res.status(200).json(project);
          _context5.next = 17;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()];
var delete_research_projects_byid = exports.delete_research_projects_byid = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _ResearchProjects["default"].destroy({
            where: {
              id: req.params.id
            }
          });
        case 3:
          deleted = _context6.sent;
          if (deleted) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Research project not found'
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
  return function delete_research_projects_byid(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var filter_research_projects = exports.filter_research_projects = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var searchString, projects;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          searchString = req.params.searchString;
          _context7.next = 4;
          return _ResearchProjects["default"].findAll({
            where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
              title: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }, {
              details: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }, {
              '$User.first_name$': (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }, {
              '$User.last_name$': (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }, {
              '$User.username$': (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }]),
            include: [{
              model: _Users["default"],
              attributes: ['username', 'first_name', 'last_name'],
              required: false // Permitir proyectos sin coincidencias en el autor
            }]
          });
        case 4:
          projects = _context7.sent;
          if (projects.length) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Research projects not found'
          }));
        case 7:
          res.status(200).json(projects);
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            error: _context7.t0.message
          });
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function filter_research_projects(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var get_research_project_author = exports.get_research_project_author = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, project, author;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          _context8.next = 4;
          return _ResearchProjects["default"].findOne({
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
          project = _context8.sent;
          if (project) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Research project not found'
          }));
        case 7:
          author = project.User;
          res.status(200).json({
            first_name: author.first_name,
            last_name: author.last_name,
            profile_img: author.profile_img
          });
          _context8.next = 14;
          break;
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            error: _context8.t0.message
          });
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function get_research_project_author(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();