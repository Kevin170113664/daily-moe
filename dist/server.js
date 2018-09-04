#!/usr/bin/env node
"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
};

var defaultPort = '3000';
var port = normalizePort(process.env.PORT || defaultPort);

_app.default.set('port', port);

var server = _http.default.createServer(_app.default);

server.listen(port);
server.on('error', onError);
server.on('listening', function () {
  return console.log("The server is listening on port ".concat(server.address().port));
});