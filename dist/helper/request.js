'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const get = async url => {
  try {
    const res = await _axios2.default.get(url);
    return res.data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

exports.default = { get };