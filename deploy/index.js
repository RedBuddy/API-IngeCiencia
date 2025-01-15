"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
//import con from './database/connection'

_app["default"].listen(_app["default"].get('PORT'));
console.log('Servidor en puerto', _app["default"].get('PORT'));