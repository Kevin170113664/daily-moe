'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bandoriArtCards = require('../static/bandori-art-cards');

var _bandoriArtCards2 = _interopRequireDefault(_bandoriArtCards);

var _loveliveCleanCards = require('../static/lovelive-clean-cards');

var _loveliveCleanCards2 = _interopRequireDefault(_loveliveCleanCards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getRandomPictures = (() => {
  var _ref = _asyncToGenerator(function* ({ pageSize, existingIds = [] }) {
    if (!_lodash2.default.isFinite(pageSize) || pageSize < 1) pageSize = 20;

    const allStaticData = _extends({}, _bandoriArtCards2.default, _loveliveCleanCards2.default);
    const randomKeys = _lodash2.default.chain(allStaticData).keys().difference(existingIds).shuffle().slice(0, pageSize).value();

    return _lodash2.default.pick(allStaticData, randomKeys);
  });

  return function getRandomPictures(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = { getRandomPictures };