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
var _Roles = _interopRequireDefault(require("./Roles.js"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var User = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(User, _Model);
  var _super = _createSuper(User);
  function User() {
    (0, _classCallCheck2["default"])(this, User);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(User);
}(_sequelize.Model);
User.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: _sequelize.DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  first_name: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false
  },
  registration_date: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW
  },
  profile_img: {
    type: _sequelize.DataTypes.BLOB('medium'),
    allowNull: true
  },
  verified: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },
  role_id: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 1,
    references: {
      model: _Roles["default"],
      key: 'id'
    }
  },
  status: {
    type: _sequelize.DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  sequelize: _connection["default"],
  modelName: 'User',
  tableName: 'USERS',
  timestamps: false
});

// Relaciones
_Roles["default"].hasMany(User, {
  foreignKey: 'role_id'
});
User.belongsTo(_Roles["default"], {
  foreignKey: 'role_id'
});
var _default = exports["default"] = User;