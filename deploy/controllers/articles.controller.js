"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_articles = exports.post_articles = exports.get_articles_byid = exports.get_articles_by_userid = exports.get_articles = exports.get_article_preview_img = exports.get_article_pdf = exports.get_article_author = exports.filter_articles = exports.delete_articles_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Articles = _interopRequireDefault(require("../database/models/Articles"));
var _ArticleViews = _interopRequireDefault(require("../database/models/ArticleViews"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var _multer = _interopRequireDefault(require("multer"));
var _sequelize = require("sequelize");
// Configurar multer para manejar la subida de archivos
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});
var post_articles = exports.post_articles = [upload.fields([{
  name: 'pdf',
  maxCount: 1
}, {
  name: 'preview_img',
  maxCount: 1
}]),
/*#__PURE__*/
// Middleware para manejar la subida de archivos
function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, id_author, title, doi, _abstract, publication_date, link, status, pdf, preview_img, newArticle;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, id_author = _req$body.id_author, title = _req$body.title, doi = _req$body.doi, _abstract = _req$body["abstract"], publication_date = _req$body.publication_date, link = _req$body.link, status = _req$body.status;
          pdf = req.files['pdf'] ? req.files['pdf'][0].buffer : null; // Obtener el archivo PDF subido
          preview_img = req.files['preview_img'] ? req.files['preview_img'][0].buffer : null; // Obtener la imagen de vista previa subida
          // Crear el nuevo artículo
          _context.next = 6;
          return _Articles["default"].create({
            id_author: id_author,
            title: title,
            doi: doi,
            "abstract": _abstract,
            publication_date: publication_date,
            link: link,
            pdf: pdf,
            // Almacenar el archivo PDF en la base de datos
            preview_img: preview_img,
            // Almacenar la imagen de vista previa en la base de datos
            status: status
          });
        case 6:
          newArticle = _context.sent;
          res.status(201).json(newArticle);
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()];
var get_articles = exports.get_articles = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var articles;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Articles["default"].findAll({});
        case 3:
          articles = _context2.sent;
          res.status(200).json(articles);
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
  return function get_articles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_articles_byid = exports.get_articles_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var article;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Articles["default"].findByPk(req.params.id, {});
        case 3:
          article = _context3.sent;
          if (article) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Artículo no encontrado'
          }));
        case 6:
          _context3.next = 8;
          return _ArticleViews["default"].create({
            id_article: article.id
          });
        case 8:
          res.status(200).json(article);
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            error: _context3.t0.message
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function get_articles_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var get_articles_by_userid = exports.get_articles_by_userid = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var articles;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Articles["default"].findAll({
            where: {
              id_author: req.params.id
            }
          });
        case 3:
          articles = _context4.sent;
          // if (!articles.length) {
          //     return res.status(200).json({ message: 'No se encontraron artículos para este usuario' });
          // }

          res.status(200).json(articles);
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
  return function get_articles_by_userid(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Función para obtener el archivo PDF de un artículo
var get_article_pdf = exports.get_article_pdf = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var article;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Articles["default"].findByPk(req.params.id, {
            attributes: ['pdf']
          });
        case 3:
          article = _context5.sent;
          if (!(!article || !article.pdf)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Archivo PDF no encontrado'
          }));
        case 6:
          res.set('Content-Type', 'application/pdf');
          res.send(article.pdf);
          _context5.next = 13;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function get_article_pdf(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Función para obtener la imagen de vista previa de un artículo
var get_article_preview_img = exports.get_article_preview_img = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var article;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Articles["default"].findByPk(req.params.id, {
            attributes: ['preview_img']
          });
        case 3:
          article = _context6.sent;
          if (!(!article || !article.preview_img)) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Imagen de vista previa no encontrada'
          }));
        case 6:
          res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo de contenido según el formato de la imagen
          res.send(article.preview_img);
          _context6.next = 13;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            error: _context6.t0.message
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function get_article_preview_img(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var update_articles = exports.update_articles = [upload.fields([{
  name: 'pdf',
  maxCount: 1
}, {
  name: 'preview_img',
  maxCount: 1
}]),
/*#__PURE__*/
// Middleware para manejar la subida de archivos
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, _req$body2, id_author, title, doi, _abstract2, publication_date, link, status, pdf, preview_img, article;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, id_author = _req$body2.id_author, title = _req$body2.title, doi = _req$body2.doi, _abstract2 = _req$body2["abstract"], publication_date = _req$body2.publication_date, link = _req$body2.link, status = _req$body2.status;
          pdf = req.files['pdf'] ? req.files['pdf'][0].buffer : null; // Obtener el archivo PDF subido
          preview_img = req.files['preview_img'] ? req.files['preview_img'][0].buffer : null; // Obtener la imagen de vista previa subida
          // Verificar si el artículo existe
          _context7.next = 7;
          return _Articles["default"].findByPk(id);
        case 7:
          article = _context7.sent;
          if (article) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Article not found'
          }));
        case 10:
          _context7.next = 12;
          return article.update({
            id_author: id_author,
            title: title,
            doi: doi,
            "abstract": _abstract2,
            publication_date: publication_date,
            link: link,
            pdf: pdf || article.pdf,
            // Mantener el PDF existente si no se proporciona uno nuevo
            preview_img: preview_img || article.preview_img,
            // Mantener la imagen de vista previa existente si no se proporciona una nueva
            status: status
          });
        case 12:
          res.status(200).json(article);
          _context7.next = 18;
          break;
        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            error: _context7.t0.message
          });
        case 18:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 15]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()];
var delete_articles_byid = exports.delete_articles_byid = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _Articles["default"].destroy({
            where: {
              id: req.params.id
            }
          });
        case 3:
          deleted = _context8.sent;
          if (deleted) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Article not found'
          }));
        case 6:
          res.status(204).json();
          _context8.next = 12;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            error: _context8.t0.message
          });
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function delete_articles_byid(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var filter_articles = exports.filter_articles = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var searchString, articles;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          searchString = req.params.searchString;
          _context9.next = 4;
          return _Articles["default"].findAll({
            where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
              title: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }, {
              "abstract": (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }, {
              doi: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
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
              required: false // Permitir artículos sin coincidencias en el autor
            }]
          });
        case 4:
          articles = _context9.sent;
          if (articles.length) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(204).json({
            message: 'Articles not found'
          }));
        case 7:
          res.status(200).json(articles);
          _context9.next = 13;
          break;
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          res.status(400).json({
            error: _context9.t0.message
          });
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function filter_articles(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var get_article_author = exports.get_article_author = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var id, article, author;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.params.id;
          _context10.next = 4;
          return _Articles["default"].findOne({
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
          article = _context10.sent;
          if (article) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: 'Article not found'
          }));
        case 7:
          author = article.User;
          res.status(200).json({
            id: author.id,
            first_name: author.first_name,
            last_name: author.last_name,
            profile_img: author.profile_img
          });
          _context10.next = 14;
          break;
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          res.status(400).json({
            error: _context10.t0.message
          });
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function get_article_author(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();