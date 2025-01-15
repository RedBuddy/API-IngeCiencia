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
var _Categories = _interopRequireDefault(require("./Categories.js"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var QuestionCategoryMap = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(QuestionCategoryMap, _Model);
  var _super = _createSuper(QuestionCategoryMap);
  function QuestionCategoryMap() {
    (0, _classCallCheck2["default"])(this, QuestionCategoryMap);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(QuestionCategoryMap);
}(_sequelize.Model);
QuestionCategoryMap.init({
  id_question: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Questions["default"],
      key: 'id'
    },
    primaryKey: true
  },
  id_category: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Categories["default"],
      key: 'id'
    },
    primaryKey: true
  }
}, {
  sequelize: _connection["default"],
  modelName: 'QuestionCategoryMap',
  tableName: 'QUESTION_CATEGORIES_MAP',
  timestamps: false
});
_Questions["default"].belongsToMany(_Categories["default"], {
  through: QuestionCategoryMap,
  foreignKey: 'id_question'
});
_Categories["default"].belongsToMany(_Questions["default"], {
  through: QuestionCategoryMap,
  foreignKey: 'id_category'
});
var _default = exports["default"] = QuestionCategoryMap;