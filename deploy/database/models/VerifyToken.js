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
var VerifyToken = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(VerifyToken, _Model);
  var _super = _createSuper(VerifyToken);
  function VerifyToken() {
    (0, _classCallCheck2["default"])(this, VerifyToken);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(VerifyToken);
}(_sequelize.Model);
VerifyToken.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Users["default"],
      key: 'id'
    },
    allowNull: false
  },
  token: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  expires_at: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  isValid: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: _connection["default"],
  modelName: 'VerifyToken',
  tableName: 'VERIFY_TOKENS',
  timestamps: false
});

// Relaciones
VerifyToken.belongsTo(_Users["default"], {
  foreignKey: 'id_user'
});
_Users["default"].hasMany(VerifyToken, {
  foreignKey: 'id_user'
});
var _default = exports["default"] = VerifyToken;