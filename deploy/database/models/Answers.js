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
var _Questions = _interopRequireDefault(require("./Questions.js"));
var _Users = _interopRequireDefault(require("./Users.js"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Answer = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Answer, _Model);
  var _super = _createSuper(Answer);
  function Answer() {
    (0, _classCallCheck2["default"])(this, Answer);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(Answer);
}(_sequelize.Model);
Answer.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_question: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Questions["default"],
      key: 'id'
    }
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
  modelName: 'Answer',
  tableName: 'ANSWERS',
  timestamps: false
});
_Questions["default"].hasMany(Answer, {
  foreignKey: 'id_question'
});
Answer.belongsTo(_Questions["default"], {
  foreignKey: 'id_question'
});
_Users["default"].hasMany(Answer, {
  foreignKey: 'id_user'
});
Answer.belongsTo(_Users["default"], {
  foreignKey: 'id_user'
});
var _default = exports["default"] = Answer;