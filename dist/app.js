"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

require("@babel/polyfill");

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _public = _interopRequireDefault(require("./routes/public"));

var _bandori = _interopRequireDefault(require("./routes/bandori"));

var _lovelive = _interopRequireDefault(require("./routes/lovelive"));

var _cinderella = _interopRequireDefault(require("./routes/cinderella"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.set('views', _path.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.static(_path.default.join(__dirname, 'public')));
app.use('/ping', _express.default.Router().get('/', function (req, res, next) {
  return res.send('pong');
}));
app.use('/api/public', _public.default);
app.use('/api/bandori', _bandori.default);
app.use('/api/lovelive', _lovelive.default);
app.use('/api/cinderella', _cinderella.default);
app.use('/', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default, {
  customSiteTitle: 'Daily Moe API'
}));
app.use(function (req, res, next) {
  return next((0, _httpErrors.default)(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
var _default = app;
exports.default = _default;