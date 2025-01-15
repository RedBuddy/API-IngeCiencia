"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendContactEmail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _Users = _interopRequireDefault(require("../database/models/Users"));
var sendContactEmail = exports.sendContactEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, user_id, email_to, subject, message, user, first_name, last_name, email_from, transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, user_id = _req$body.user_id, email_to = _req$body.email_to, subject = _req$body.subject, message = _req$body.message; // Buscar el usuario por ID
          _context.next = 4;
          return _Users["default"].findByPk(user_id);
        case 4:
          user = _context.sent;
          if (user) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 7:
          first_name = user.first_name, last_name = user.last_name, email_from = user.email; // Configurar el transporte de nodemailer
          transporter = _nodemailer["default"].createTransport({
            service: 'Gmail',
            auth: {
              user: 'orlandolmsm@gmail.com',
              pass: 'jkocwtwiesgrwtjz'
            }
          }); // Configurar las opciones del correo electrónico
          mailOptions = {
            from: email_from,
            to: email_to,
            subject: "Contacto IngeCiencia: ".concat(subject),
            html: "\n                <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;\">\n                    <h2 style=\"text-align: center; color: #003b5c;\">Mensaje de contacto desde IngeCiencia</h2>\n                    <p><strong>Nombre:</strong> ".concat(first_name, " ").concat(last_name, "</p>\n                    <p><strong>Email:</strong> ").concat(email_from, "</p>\n                    <p><strong>Asunto:</strong> ").concat(subject, "</p>\n                    <p><strong>Mensaje:</strong></p>\n                    <p>").concat(message, "</p>\n                </div>\n            ")
          }; // Enviar el correo electrónico
          _context.next = 12;
          return transporter.sendMail(mailOptions);
        case 12:
          res.status(200).json({
            message: 'Correo enviado exitosamente'
          });
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0.message
          });
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function sendContactEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();