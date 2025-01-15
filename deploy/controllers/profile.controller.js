"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_profile = exports.post_profile = exports.get_user_card = exports.get_user_about = exports.get_researchers_details = exports.get_profiles = exports.get_profile_byid = exports.get_admin_profile = exports.delete_profile_byid = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Profile = _interopRequireDefault(require("../database/models/Profile"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var _UserDisciplines = _interopRequireDefault(require("../database/models/UserDisciplines"));
var _Categories = _interopRequireDefault(require("../database/models/Categories"));
var _Roles = _interopRequireDefault(require("../database/models/Roles"));
var _Articles = _interopRequireDefault(require("../database/models/Articles"));
var _sequelize = require("sequelize");
var post_profile = exports.post_profile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, id_user, university, faculty, department, orcid, biography, experience, google_scholar_link, research_gate_link, newProfile;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, id_user = _req$body.id_user, university = _req$body.university, faculty = _req$body.faculty, department = _req$body.department, orcid = _req$body.orcid, biography = _req$body.biography, experience = _req$body.experience, google_scholar_link = _req$body.google_scholar_link, research_gate_link = _req$body.research_gate_link; // Crear el nuevo perfil
          _context.next = 4;
          return _Profile["default"].create({
            id_user: id_user,
            university: university || null,
            faculty: faculty || null,
            department: department || null,
            orcid: orcid || null,
            biography: biography || null,
            experience: experience || null,
            google_scholar_link: google_scholar_link || null,
            research_gate_link: research_gate_link || null
          });
        case 4:
          newProfile = _context.sent;
          res.status(201).json({
            message: 'Profile created successfully'
          });
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
  return function post_profile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_profiles = exports.get_profiles = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var profiles;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Profile["default"].findAll({});
        case 3:
          profiles = _context2.sent;
          res.status(200).json(profiles);
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
  return function get_profiles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var get_profile_byid = exports.get_profile_byid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var profile;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Profile["default"].findOne({
            where: {
              id_user: req.params.id
            },
            include: _Users["default"]
          });
        case 3:
          profile = _context3.sent;
          if (profile) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Profile not found'
          }));
        case 6:
          res.status(200).json(profile);
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
  return function get_profile_byid(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update_profile = exports.update_profile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var profile, updatedProfile;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Profile["default"].findOne({
            where: {
              id_user: req.params.id
            }
          });
        case 3:
          profile = _context4.sent;
          if (profile) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Profile not found'
          }));
        case 6:
          _context4.next = 8;
          return _Profile["default"].update(req.body, {
            where: {
              id_user: req.params.id
            }
          });
        case 8:
          _context4.next = 10;
          return _Profile["default"].findOne({
            where: {
              id_user: req.params.id
            },
            include: _Users["default"]
          });
        case 10:
          updatedProfile = _context4.sent;
          res.status(200).json({
            message: 'Profile updated successfully'
          });
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
  return function update_profile(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var delete_profile_byid = exports.delete_profile_byid = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deleted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Profile["default"].destroy({
            where: {
              id_user: req.params.id
            }
          });
        case 3:
          deleted = _context5.sent;
          if (deleted) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Profile not found'
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
  return function delete_profile_byid(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var get_user_card = exports.get_user_card = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, user, result;
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
            attributes: ['first_name', 'last_name', 'email', 'profile_img'],
            include: [{
              model: _Profile["default"],
              attributes: ['university', 'faculty', 'orcid', 'google_scholar_link', 'research_gate_link']
            }]
          });
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          result = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            profile_img: user.profile_img,
            university: user.Profile ? user.Profile.university : null,
            faculty: user.Profile ? user.Profile.faculty : null,
            orcid: user.Profile ? user.Profile.orcid : null,
            google_scholar_link: user.Profile ? user.Profile.google_scholar_link : null,
            research_gate_link: user.Profile ? user.Profile.research_gate_link : null
          };
          res.status(200).json(result);
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
  return function get_user_card(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var get_user_about = exports.get_user_about = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, user, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return _Users["default"].findOne({
            where: {
              id: id
            },
            attributes: ['first_name', 'last_name'],
            include: [{
              model: _Profile["default"],
              attributes: ['biography', 'experience']
            }, {
              model: _UserDisciplines["default"],
              attributes: ['id_category'],
              include: {
                model: _Categories["default"],
                attributes: ['category_name']
              }
            }]
          });
        case 4:
          user = _context7.sent;
          if (user) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          result = {
            first_name: user.first_name,
            last_name: user.last_name,
            biography: user.Profile ? user.Profile.biography : null,
            experience: user.Profile ? user.Profile.experience : null,
            disciplines: user.UserDisciplines.map(function (discipline) {
              return discipline.Category.category_name;
            })
          };
          res.status(200).json(result);
          _context7.next = 14;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            error: _context7.t0.message
          });
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function get_user_about(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var get_researchers_details = exports.get_researchers_details = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var users, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _Users["default"].findAll({
            attributes: ['id', 'first_name', 'last_name', 'profile_img'],
            include: [{
              model: _Roles["default"],
              where: {
                role_name: ['autor', 'editor', 'admin']
              },
              attributes: []
            }, {
              model: _Profile["default"],
              attributes: ['university', 'faculty', 'department']
            }]
          });
        case 3:
          users = _context9.sent;
          _context9.next = 6;
          return Promise.all(users.map( /*#__PURE__*/function () {
            var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(user) {
              var publicationsCount;
              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _Articles["default"].count({
                      where: {
                        id_author: user.id
                      }
                    });
                  case 2:
                    publicationsCount = _context8.sent;
                    return _context8.abrupt("return", {
                      id: user.id,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      profile_img: user.profile_img,
                      university: user.Profile ? user.Profile.university : null,
                      faculty: user.Profile ? user.Profile.faculty : null,
                      department: user.Profile ? user.Profile.department : null,
                      publications_count: publicationsCount
                    });
                  case 4:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x17) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 6:
          result = _context9.sent;
          res.status(200).json(result);
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
  return function get_researchers_details(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var get_admin_profile = exports.get_admin_profile = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var users, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _Users["default"].findAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'profile_img'],
            include: [{
              model: _Roles["default"],
              where: {
                role_name: ['admin']
              },
              attributes: []
            }, {
              model: _Profile["default"],
              attributes: ['university', 'faculty', 'department']
            }]
          });
        case 3:
          users = _context11.sent;
          _context11.next = 6;
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
                      email: user.email,
                      profile_img: user.profile_img,
                      university: user.Profile ? user.Profile.university : null,
                      faculty: user.Profile ? user.Profile.faculty : null,
                      department: user.Profile ? user.Profile.department : null,
                      publications_count: publicationsCount
                    });
                  case 4:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x20) {
              return _ref11.apply(this, arguments);
            };
          }()));
        case 6:
          result = _context11.sent;
          res.status(200).json(result);
          _context11.next = 13;
          break;
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          res.status(400).json({
            error: _context11.t0.message
          });
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function get_admin_profile(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();