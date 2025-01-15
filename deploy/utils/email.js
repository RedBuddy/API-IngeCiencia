"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendVerificationEmail = exports.sendRecoveryEmail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var sendVerificationEmail = exports.sendVerificationEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, token) {
    var transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          transporter = _nodemailer["default"].createTransport({
            service: 'Gmail',
            auth: {
              user: 'orlandolmsm@gmail.com',
              pass: 'jkocwtwiesgrwtjz'
            }
          });
          mailOptions = {
            from: 'orlandolmsm@gmail.com',
            to: email,
            subject: 'Email de verificación IngeCiencia',
            html: "\n        <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;\">\n            <h2 style=\"text-align: center; color: #02182b;\">IngeCiencia</h2>\n            <p>Hola,</p>\n            <p>Gracias por registrarte en IngeCiencia. Por favor, verifica tu correo electr\xF3nico haciendo clic en el siguiente enlace:</p>\n            <div style=\"text-align: center; margin: 20px 0;\">\n                <a href=\"http://localhost:4200/verificar-email?token=".concat(token, "\" style=\"background-color: #003b5c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Verificar Email</a>\n            </div>\n            <p >Si no puedes hacer clic en el enlace, copia y pega la token en el cuadro de verificaci\xF3n:</p>\n            <p style=\"text-align: center;\">").concat(token, "</p>\n            <p>Gracias,</p>\n            <p>El equipo de IngeCiencia</p>\n        </div>\n    ")
          };
          _context.next = 4;
          return transporter.sendMail(mailOptions);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendVerificationEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var sendRecoveryEmail = exports.sendRecoveryEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, token) {
    var transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          transporter = _nodemailer["default"].createTransport({
            service: 'Gmail',
            auth: {
              user: 'orlandolmsm@gmail.com',
              pass: 'jkocwtwiesgrwtjz'
            }
          });
          mailOptions = {
            from: 'orlandolmsm@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            html: "\n            <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;\">\n                <h2 style=\"text-align: center; color: #02182b;\">Recuperaci\xF3n de contrase\xF1a</h2>\n                <p>Hola,</p>\n                <p>Has solicitado recuperar tu contrase\xF1a. Por favor, haz clic en el siguiente enlace para restablecer tu contrase\xF1a:</p>\n                <div style=\"text-align: center; margin: 20px 0;\">\n                    <a href=\"http://localhost:4200/reset-password?token=".concat(token, "\" style=\"background-color: #003b5c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Restablecer contrase\xF1a</a>\n                </div>\n                <p>Si no puedes hacer clic en el enlace, copia y pega la siguiente URL en tu navegador:</p>\n                <p><a href=\"http://localhost:4200/reset-password?token=").concat(token, "\">http://localhost:4200/reset-password?token=").concat(token, "</a></p>\n                <p>Gracias,</p>\n                <p>El equipo de IngeCiencia</p>\n            </div>\n        ")
          };
          _context2.next = 4;
          return transporter.sendMail(mailOptions);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sendRecoveryEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();