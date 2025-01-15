"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_users = exports.update_user_by_id = exports.post_users = exports.post_user_img = exports.get_users_byid = exports.get_users = exports.get_user_img = exports.get_user_details = exports.get_user_data_byid = exports.get_authors = exports.delete_users_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var _Roles = _interopRequireDefault(require("../database/models/Roles"));
var _UserDisciplines = _interopRequireDefault(require("../database/models/UserDisciplines"));
var _Articles = _interopRequireDefault(require("../database/models/Articles"));
var _Categories = _interopRequireDefault(require("../database/models/Categories"));
var _Profile = _interopRequireDefault(require("../database/models/Profile"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _multer = _interopRequireDefault(require("multer"));
var _sequelize = require("sequelize");
// Configurar multer para manejar la subida de archivos
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});
var post_users = exports.post_users = [upload.single('profile_img'),
/*#__PURE__*/
// Middleware para manejar la subida de la imagen de perfil
function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, email, password, first_name, last_name, role_id, status, profile_img, existingUser, existingEmail, hashedPassword, newUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, first_name = _req$body.first_name, last_name = _req$body.last_name, role_id = _req$body.role_id, status = _req$body.status;
          profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido
          // Verificar si el username o email ya existen
          _context.next = 5;
          return _Users["default"].findOne({
            where: {
              username: username
            }
          });
        case 5:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'El nombre de usuario ya está en uso'
          }));
        case 8:
          _context.next = 10;
          return _Users["default"].findOne({
            where: {
              email: email
            }
          });
        case 10:
          existingEmail = _context.sent;
          if (!existingEmail) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'El correo electrónico ya está en uso'
          }));
        case 13:
          _context.next = 15;
          return _bcrypt["default"].hash(password, 10);
        case 15:
          hashedPassword = _context.sent;
          _context.next = 18;
          return _Users["default"].create({
            username: username,
            email: email,
            password: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            profile_img: profile_img,
            // Almacenar la imagen de perfil en la base de datos
            role_id: role_id,
            status: status
          });
        case 18:
          newUser = _context.sent;
          res.status(201).json({
            id: newUser.id,
            message: 'Usuario creado exitosamente'
          });
          _context.next = 25;
          break;
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 22]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()];

// Función para subir la imagen de perfil de un usuario existente
var post_user_img = exports.post_user_img = [upload.single('profile_img'),
/*#__PURE__*/
// Middleware para manejar la subida de la imagen de perfil
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var profile_img, _yield$User$update, _yield$User$update2, updated;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido
          if (profile_img) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'No se proporcionó una imagen'
          }));
        case 4:
          _context2.next = 6;
          return _Users["default"].update({
            profile_img: profile_img
          }, {
            where: {
              id: req.params.id
            }
          });
        case 6:
          _yield$User$update = _context2.sent;
          _yield$User$update2 = (0, _slicedToArray2["default"])(_yield$User$update, 1);
          updated = _yield$User$update2[0];
          if (updated) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 11:
          // const updatedUser = await User.findByPk(req.params.id);
          res.status(202).json({
            message: 'Imagen de perfil actualizada'
          });
          _context2.next = 17;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            error: _context2.t0.message
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()];

// Función para obtener la imagen de perfil de un usuario
var get_user_img = exports.get_user_img = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Users["default"].findByPk(req.params.id, {
            attributes: ['profile_img']
          });
        case 3:
          user = _context3.sent;
          if (!(!user || !user.profile_img)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Imagen no encontrada'
          }));
        case 6:
          res.set('Content-Type', 'image/jpeg'); // Ajusta el tipo de contenido según el formato de la imagen
          res.send(user.profile_img);
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            error: _context3.t0.message
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function get_user_img(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var get_users = exports.get_users = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Users["default"].findAll();
        case 3:
          users = _context4.sent;
          res.status(200).json(users);
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
  return function get_users(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var get_users_byid = exports.get_users_byid = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Users["default"].findByPk(req.params.id);
        case 3:
          user = _context5.sent;
          if (user) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          res.status(200).json(user);
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
  return function get_users_byid(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var get_user_data_byid = exports.get_user_data_byid = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return _Users["default"].findOne({
            where: {
              id: id
            },
            attributes: ['id', 'first_name', 'last_name', 'email']
          });
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 7:
          res.status(200).json(user);
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
  return function get_user_data_byid(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var update_users = exports.update_users = [upload.single('profile_img'),
/*#__PURE__*/
// Middleware para manejar la subida de la imagen de perfil
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, _req$body2, username, email, first_name, last_name, verified, role_id, status, new_password, profile_img, user, existingEmail, updatedFields, hashedPassword;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, first_name = _req$body2.first_name, last_name = _req$body2.last_name, verified = _req$body2.verified, role_id = _req$body2.role_id, status = _req$body2.status, new_password = _req$body2.new_password;
          profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido
          _context7.next = 6;
          return _Users["default"].findByPk(id);
        case 6:
          user = _context7.sent;
          if (user) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 9:
          if (!(email && email !== user.email)) {
            _context7.next = 15;
            break;
          }
          _context7.next = 12;
          return _Users["default"].findOne({
            where: {
              email: email
            }
          });
        case 12:
          existingEmail = _context7.sent;
          if (!existingEmail) {
            _context7.next = 15;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'El correo electrónico ya está en uso por otro usuario'
          }));
        case 15:
          // Verificar si se proporciona una nueva contraseña
          updatedFields = {
            username: username,
            email: email || user.email,
            // Mantener el correo electrónico actual si no se proporciona uno nuevo
            first_name: first_name,
            last_name: last_name,
            verified: verified,
            role_id: role_id,
            status: status,
            profile_img: profile_img || user.profile_img // Mantener la imagen de perfil actual si no se proporciona una nueva
          };
          if (!new_password) {
            _context7.next = 21;
            break;
          }
          _context7.next = 19;
          return _bcrypt["default"].hash(new_password, 10);
        case 19:
          hashedPassword = _context7.sent;
          updatedFields.password = hashedPassword;
        case 21:
          _context7.next = 23;
          return user.update(updatedFields);
        case 23:
          res.status(200).json({
            message: 'User updated successfully',
            user: user
          });
          _context7.next = 29;
          break;
        case 26:
          _context7.prev = 26;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            error: _context7.t0.message
          });
        case 29:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 26]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()];
var delete_users_byid = exports.delete_users_byid = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _Users["default"].destroy({
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
            message: 'User not found'
          }));
        case 6:
          res.status(204).json({
            message: 'User deleted'
          });
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
  return function delete_users_byid(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var get_authors = exports.get_authors = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var authors;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _Users["default"].findAll({
            attributes: ['id', 'first_name', 'last_name', 'profile_img'],
            include: [{
              model: _Roles["default"],
              attributes: [],
              where: {
                role_name: ['autor', 'editor', 'admin']
              }
            }]
          });
        case 3:
          authors = _context9.sent;
          res.status(200).json(authors);
          _context9.next = 10;
          break;
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          res.status(400).json({
            error: _context9.t0.message
          });
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function get_authors(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var get_user_details = exports.get_user_details = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var searchString, users, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          searchString = req.params.searchString;
          _context11.next = 4;
          return _Users["default"].findAll({
            where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
              first_name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }, {
              last_name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchString, "%"))
            }]),
            attributes: ['id', 'first_name', 'last_name', 'profile_img'],
            include: [{
              model: _UserDisciplines["default"],
              attributes: ['id_category'],
              include: {
                model: _Categories["default"],
                attributes: ['category_name']
              }
            }, {
              model: _Profile["default"],
              attributes: ['university', 'faculty', 'department']
            }]
          });
        case 4:
          users = _context11.sent;
          if (users.length) {
            _context11.next = 7;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: 'Users not found'
          }));
        case 7:
          _context11.next = 9;
          return Promise.all(users.map( /*#__PURE__*/function () {
            var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(user) {
              var publicationsCount;
              return _regenerator["default"].wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return _Articles["default"].count({
                      where: {
                        id_author: user.id
                      }
                    });
                  case 2:
                    publicationsCount = _context10.sent;
                    return _context10.abrupt("return", {
                      id: user.id,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      profile_img: user.profile_img,
                      university: user.Profile ? user.Profile.university : null,
                      faculty: user.Profile ? user.Profile.faculty : null,
                      department: user.Profile ? user.Profile.department : null,
                      user_disciplines: user.UserDisciplines.slice(0, 3).map(function (discipline) {
                        return discipline.Category.category_name;
                      }),
                      publications_count: publicationsCount
                    });
                  case 4:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x21) {
              return _ref11.apply(this, arguments);
            };
          }()));
        case 9:
          result = _context11.sent;
          res.status(200).json(result);
          _context11.next = 16;
          break;
        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](0);
          res.status(400).json({
            error: _context11.t0.message
          });
        case 16:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 13]]);
  }));
  return function get_user_details(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var update_user_by_id = exports.update_user_by_id = [upload.single('profile_img'),
/*#__PURE__*/
// Middleware para manejar la subida de la imagen de perfil
function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var id, _req$body3, first_name, last_name, email, current_password, new_password, profile_img, user, isMatch, existingEmail, updatedFields, hashedPassword;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          id = req.params.id;
          _req$body3 = req.body, first_name = _req$body3.first_name, last_name = _req$body3.last_name, email = _req$body3.email, current_password = _req$body3.current_password, new_password = _req$body3.new_password;
          profile_img = req.file ? req.file.buffer : null; // Obtener la imagen de perfil del archivo subido
          _context12.next = 6;
          return _Users["default"].findByPk(id);
        case 6:
          user = _context12.sent;
          if (user) {
            _context12.next = 9;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 9:
          _context12.next = 11;
          return _bcrypt["default"].compare(current_password, user.password);
        case 11:
          isMatch = _context12.sent;
          if (isMatch) {
            _context12.next = 14;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            message: 'La contraseña actual es incorrecta'
          }));
        case 14:
          if (!(email && email !== user.email)) {
            _context12.next = 20;
            break;
          }
          _context12.next = 17;
          return _Users["default"].findOne({
            where: {
              email: email
            }
          });
        case 17:
          existingEmail = _context12.sent;
          if (!existingEmail) {
            _context12.next = 20;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            message: 'El correo electrónico ya está en uso por otro usuario'
          }));
        case 20:
          // Verificar si se proporciona una nueva contraseña
          updatedFields = {
            first_name: first_name,
            last_name: last_name,
            email: email || user.email,
            // Mantener el correo electrónico actual si no se proporciona uno nuevo
            profile_img: profile_img || user.profile_img // Mantener la imagen de perfil actual si no se proporciona una nueva
          }; // Si el correo electrónico ha cambiado, establecer verified en false

          if (email && email !== user.email) {
            updatedFields.verified = false;
          }
          if (!new_password) {
            _context12.next = 27;
            break;
          }
          _context12.next = 25;
          return _bcrypt["default"].hash(new_password, 10);
        case 25:
          hashedPassword = _context12.sent;
          updatedFields.password = hashedPassword;
        case 27:
          _context12.next = 29;
          return user.update(updatedFields);
        case 29:
          res.status(200).json({
            message: 'Usuario actualizado exitosamente'
          });
          _context12.next = 35;
          break;
        case 32:
          _context12.prev = 32;
          _context12.t0 = _context12["catch"](0);
          res.status(400).json({
            error: _context12.t0.message
          });
        case 35:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 32]]);
  }));
  return function (_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}()];