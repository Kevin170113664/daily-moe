'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _bandori = require('./routes/bandori');

var _bandori2 = _interopRequireDefault(_bandori);

var _swagger = require('./swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/ping', _express2.default.Router().get('/', (req, res, next) => res.send('pong')));
app.use('/api/bandori', _bandori2.default);
app.use('/', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default, { customSiteTitle: 'Daily Moe API' }));

app.use((req, res, next) => next((0, _httpErrors2.default)(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

exports.default = app;