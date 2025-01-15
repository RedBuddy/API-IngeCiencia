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
var _Articles = _interopRequireDefault(require("./Articles.js"));
var _Categories = _interopRequireDefault(require("./Categories.js"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ArticleCategory = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(ArticleCategory, _Model);
  var _super = _createSuper(ArticleCategory);
  function ArticleCategory() {
    (0, _classCallCheck2["default"])(this, ArticleCategory);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(ArticleCategory);
}(_sequelize.Model);
ArticleCategory.init({
  id_article: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Articles["default"],
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
  modelName: 'ArticleCategory',
  tableName: 'ARTICLE_CATEGORIES_MAP',
  timestamps: false
});
_Articles["default"].belongsToMany(_Categories["default"], {
  through: ArticleCategory,
  foreignKey: 'id_article'
});
_Categories["default"].belongsToMany(_Articles["default"], {
  through: ArticleCategory,
  foreignKey: 'id_category'
});
var _default = exports["default"] = ArticleCategory;