#!/usr/bin/env node

import http from 'http'
import app from './src/app'
import {normalizePort, onError} from './src/helper/start-up-helper'

const defaultPort = '3000';
const port = normalizePort(process.env.PORT || defaultPort)
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', () => console.log(`The server is listening on port ${server.address().port}`))

