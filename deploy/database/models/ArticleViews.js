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
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ArticleView = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(ArticleView, _Model);
  var _super = _createSuper(ArticleView);
  function ArticleView() {
    (0, _classCallCheck2["default"])(this, ArticleView);
    return _super.apply(this, arguments);
  }
  return (0, _createClass2["default"])(ArticleView);
}(_sequelize.Model);
ArticleView.init({
  id_article: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Articles["default"],
      key: 'id'
    },
    primaryKey: true
  },
  view_date: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: _sequelize.DataTypes.NOW
  }
}, {
  sequelize: _connection["default"],
  modelName: 'ArticleView',
  tableName: 'ARTICLE_VIEWS',
  timestamps: false
});

// Relaciones
_Articles["default"].hasMany(ArticleView, {
  foreignKey: 'id_article'
});
ArticleView.belongsTo(_Articles["default"], {
  foreignKey: 'id_article'
});
var _default = exports["default"] = ArticleView;