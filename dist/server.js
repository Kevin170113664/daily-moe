#!/usr/bin/env node
"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _startUpHelper = require("./helper/start-up-helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPort = '3000';
var port = (0, _startUpHelper.normalizePort)(process.env.PORT || defaultPort);

_app.default.set('port', port);

var server = _http.default.createServer(_app.default);

server.listen(port);
server.on('error', _startUpHelper.onError);
server.on('listening', function () {
  return console.log("The server is listening on port ".concat(server.address().port));
});