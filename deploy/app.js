"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("./config"));
var _cors = _interopRequireDefault(require("cors"));
var _users = _interopRequireDefault(require("./routes/users.routes"));
var _profile = _interopRequireDefault(require("./routes/profile.routes"));
var _user_disciplines = _interopRequireDefault(require("./routes/user_disciplines.routes"));
var _articles = _interopRequireDefault(require("./routes/articles.routes"));
var _answers = _interopRequireDefault(require("./routes/answers.routes"));
var _article_categories = _interopRequireDefault(require("./routes/article_categories.routes"));
var _article_coauthors = _interopRequireDefault(require("./routes/article_coauthors.routes"));
var _article_views = _interopRequireDefault(require("./routes/article_views.routes"));
var _categories = _interopRequireDefault(require("./routes/categories.routes"));
var _project_categories = _interopRequireDefault(require("./routes/project_categories.routes"));
var _questions = _interopRequireDefault(require("./routes/questions.routes"));
var _question_categories = _interopRequireDefault(require("./routes/question_categories.routes"));
var _research_projects = _interopRequireDefault(require("./routes/research_projects.routes"));
var _resource_coauthors = _interopRequireDefault(require("./routes/resource_coauthors.routes"));
var _resources = _interopRequireDefault(require("./routes/resources.routes"));
var _roles = _interopRequireDefault(require("./routes/roles.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _contacto = _interopRequireDefault(require("./routes/contacto.routes"));
var app = (0, _express["default"])();

// settings 
app.set('PORT', _config["default"].PORT);

// middlewares
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use(_users["default"]);
app.use(_profile["default"]);
app.use(_user_disciplines["default"]);
app.use(_articles["default"]);
app.use(_answers["default"]);
app.use(_article_categories["default"]);
app.use(_article_coauthors["default"]);
app.use(_article_views["default"]);
app.use(_categories["default"]);
app.use(_project_categories["default"]);
app.use(_questions["default"]);
app.use(_question_categories["default"]);
app.use(_research_projects["default"]);
app.use(_resource_coauthors["default"]);
app.use(_resources["default"]);
app.use(_roles["default"]);
app.use(_auth["default"]);
app.use(_contacto["default"]);
var _default = exports["default"] = app;