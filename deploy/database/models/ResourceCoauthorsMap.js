"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _sequelize = require("sequelize");
var _connection = _interopRequireDefault(require("../connection.js"));
var _Resources = _interopRequireDefault(require("./Resources.js"));
var _Users = _interopRequireDefault(require("./Users.js"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ResourceCoAuthorsMap = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(ResourceCoAuthorsMap, _Model);
  var _super = _createSuper(ResourceCoAuthorsMap);
  function ResourceCoAuthorsMap() {
    (0, _classCallCheck2["default"])(this, ResourceCoAuthorsMap);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(ResourceCoAuthorsMap);
}(_sequelize.Model);
ResourceCoAuthorsMap.init({
  id_resource: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Resources["default"],
      key: 'id'
    },
    primaryKey: true
  },
  id_coauthor: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Users["default"],
      key: 'id'
    },
    primaryKey: true
  }
}, {
  sequelize: _connection["default"],
  modelName: 'ResourceCoAuthorsMap',
  tableName: 'RESOURCE_COAUTHORS_MAP',
  timestamps: false
});
_Resources["default"].belongsToMany(_Users["default"], {
  through: ResourceCoAuthorsMap,
  foreignKey: 'id_resource'
});
_Users["default"].belongsToMany(_Resources["default"], {
  through: ResourceCoAuthorsMap,
  foreignKey: 'id_coauthor'
});
var _default = exports["default"] = ResourceCoAuthorsMap;