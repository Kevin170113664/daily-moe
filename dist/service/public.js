"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _bandoriArtCards = _interopRequireDefault(require("../static/bandori-art-cards"));

var _loveliveCleanCards = _interopRequireDefault(require("../static/lovelive-clean-cards"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getRandomPictures =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var pageSize, _ref$existingIds, existingIds, allStaticData, randomKeys;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageSize = _ref.pageSize, _ref$existingIds = _ref.existingIds, existingIds = _ref$existingIds === void 0 ? [] : _ref$existingIds;
            pageSize = parseInt(pageSize);
            if (!_lodash.default.isFinite(pageSize) || pageSize < 1) pageSize = 20;
            allStaticData = _objectSpread({}, _bandoriArtCards.default, _loveliveCleanCards.default);
            randomKeys = _lodash.default.chain(allStaticData).keys().difference(existingIds).shuffle().slice(0, pageSize).value();
            return _context.abrupt("return", _lodash.default.pick(allStaticData, randomKeys));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRandomPictures(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getRandomPictures: getRandomPictures
};
exports.default = _default;