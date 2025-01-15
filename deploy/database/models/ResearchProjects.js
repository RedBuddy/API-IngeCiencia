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
var ResearchProject = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(ResearchProject, _Model);
  var _super = _createSuper(ResearchProject);
  function ResearchProject() {
    (0, _classCallCheck2["default"])(this, ResearchProject);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(ResearchProject);
}(_sequelize.Model);
ResearchProject.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_author: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Users["default"],
      key: 'id'
    },
    allowNull: false
  },
  title: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  details: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  vacancies: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  preview_img: {
    type: _sequelize.DataTypes.BLOB('medium'),
    allowNull: true
  },
  status: {
    type: _sequelize.DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  created_at: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW
  },
  updated_at: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW,
    onUpdate: _sequelize.DataTypes.NOW
  }
}, {
  sequelize: _connection["default"],
  modelName: 'ResearchProject',
  tableName: 'RESEARCH_PROJECTS',
  timestamps: false
});

// Relaciones
_Users["default"].hasMany(ResearchProject, {
  foreignKey: 'id_author'
});
ResearchProject.belongsTo(_Users["default"], {
  foreignKey: 'id_author'
});
var _default = exports["default"] = ResearchProject;