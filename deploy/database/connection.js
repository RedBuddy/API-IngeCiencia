"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = _interopRequireDefault(require("../config"));
var _sequelize = require("sequelize");
var sequelize = new _sequelize.Sequelize(_config["default"].DB_DATABASE, _config["default"].DB_USER, _config["default"].DB_PASSWORD, {
  host: _config["default"].DB_HOST,
  dialect: 'mysql',
  port: _config["default"].DB_PORT,
  logging: false
});
var _default = exports["default"] = sequelize;