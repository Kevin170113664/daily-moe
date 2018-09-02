#!/usr/bin/env node
'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _startUpHelper = require('../helper/start-up-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultPort = '3000';
const port = (0, _startUpHelper.normalizePort)(process.env.PORT || defaultPort);
_app2.default.set('port', port);

const server = _http2.default.createServer(_app2.default);

server.listen(port);
server.on('error', _startUpHelper.onError);
server.on('listening', () => console.log(`The server is listening on port ${server.address().port}`));