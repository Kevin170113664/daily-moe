'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const get = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    try {
      const res = yield _axios2.default.get(url);
      return res.data;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  });

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = { get };