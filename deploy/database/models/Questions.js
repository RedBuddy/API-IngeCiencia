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
var _Users = _interopRequireDefault(require("./Users.js"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Question = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Question, _Model);
  var _super = _createSuper(Question);
  function Question() {
    (0, _classCallCheck2["default"])(this, Question);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(Question);
}(_sequelize.Model);
Question.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  body: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  id_user: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Users["default"],
      key: 'id'
    }
  },
  active: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW
  },
  updated_at: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW
  }
}, {
  sequelize: _connection["default"],
  modelName: 'Question',
  tableName: 'QUESTIONS',
  timestamps: false
});
_Users["default"].hasMany(Question, {
  foreignKey: 'id_user'
});
Question.belongsTo(_Users["default"], {
  foreignKey: 'id_user'
});
var _default = exports["default"] = Question;