"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _bandoriArtCards = _interopRequireDefault(require("../static/bandori-art-cards"));

var _loveliveCleanCards = _interopRequireDefault(require("../static/lovelive-clean-cards"));

var _cinderellaSpreadCards = _interopRequireDefault(require("../static/cinderella-spread-cards"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getRandomPictures = function getRandomPictures(_ref) {
  var pageSize = _ref.pageSize,
      _ref$existingIds = _ref.existingIds,
      existingIds = _ref$existingIds === void 0 ? [] : _ref$existingIds;
  pageSize = parseInt(pageSize);
  if (!_lodash.default.isFinite(pageSize) || pageSize < 1) pageSize = 20;

  var allStaticData = _objectSpread({}, _bandoriArtCards.default, _loveliveCleanCards.default, _cinderellaSpreadCards.default);

  var randomKeys = _lodash.default.chain(allStaticData).keys().difference(existingIds).shuffle().slice(0, pageSize).value();

  return _lodash.default.pick(allStaticData, randomKeys);
};

var _default = {
  getRandomPictures: getRandomPictures
};
exports.default = _default;