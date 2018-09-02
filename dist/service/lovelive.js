"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _shortid = _interopRequireDefault(require("shortid"));

var _request = _interopRequireDefault(require("../helper/request"));

var _loveliveCleanCards = _interopRequireDefault(require("../static/lovelive-clean-cards"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var baseUrl = 'https://schoolido.lu/api';

var getCleanCards =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var maxPageSize, res, pages, cleanPicture, staticJSONPath;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            maxPageSize = 100;
            _context2.next = 3;
            return _request.default.get("".concat(baseUrl, "/cards/?page_size=1&rarity=UR,SSR"));

          case 3:
            res = _context2.sent;
            pages = _lodash.default.range(1, Math.ceil(res.count / maxPageSize) + 1);
            cleanPicture = {};
            _context2.next = 8;
            return Promise.all(_lodash.default.map(pages,
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(page) {
                var res;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _request.default.get("".concat(baseUrl, "/cards/?page=").concat(page, "&page_size=").concat(maxPageSize, "&rarity=UR,SSR"));

                      case 2:
                        res = _context.sent;

                        _lodash.default.each(res.results, function (result) {
                          if (!_lodash.default.isEmpty(result.clean_ur)) cleanPicture[_shortid.default.generate()] = "https:".concat(result.clean_ur);
                          if (!_lodash.default.isEmpty(result.clean_ur_idolized)) cleanPicture[_shortid.default.generate()] = "https:".concat(result.clean_ur_idolized);
                        });

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 8:
            if (_lodash.default.values(cleanPicture).length > _lodash.default.values(_loveliveCleanCards.default).length) {
              staticJSONPath = _path.default.join(__dirname, '../static/lovelive-clean-cards.json');

              _fs.default.writeFileSync(staticJSONPath, JSON.stringify(cleanPicture));
            }

            return _context2.abrupt("return", cleanPicture);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getCleanCards() {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  getCleanCards: getCleanCards
};
exports.default = _default;