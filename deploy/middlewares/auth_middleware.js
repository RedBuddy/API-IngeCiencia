"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyJwtToken = void 0;
var _jwtconfig = require("../jwtconfig");
var verifyJwtToken = exports.verifyJwtToken = function verifyJwtToken(req, res, next) {
  var authHeader = req.headers['authorization'];

  // Verificar si el token está presente en las cabeceras
  if (!authHeader) {
    return res.status(403).json({
      message: 'No se proporcionó un token'
    });
  }
  var token = authHeader.split(' ')[1]; // Extraer el token del header

  try {
    // Verificar el token utilizando la función de jwtConfig
    var decoded = (0, _jwtconfig.verifyToken)(token);
    req.user = decoded; // Agregar los datos del usuario decodificados al request

    next(); // Continuar con el siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado'
    });
  }
};