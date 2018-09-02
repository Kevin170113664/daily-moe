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

var _bandoriArtCards = _interopRequireDefault(require("../static/bandori-art-cards"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var baseUrl = 'https://bandori.party/api';

var getArtPictures =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var maxPageSize, cardIds, pages, artPicture;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            maxPageSize = 120;
            _context2.next = 3;
            return _request.default.get("".concat(baseUrl, "/cardids"));

          case 3:
            cardIds = _context2.sent;
            pages = _lodash.default.range(1, Math.ceil(cardIds.length / maxPageSize) + 1);
            artPicture = {};
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
                        return _request.default.get("".concat(baseUrl, "/cards?page=").concat(page, "&page_size=").concat(maxPageSize));

                      case 2:
                        res = _context.sent;

                        _lodash.default.each(res.results, function (result) {
                          if (!_lodash.default.isEmpty(result.art) && !_lodash.default.isEmpty(result.art_trained)) {
                            artPicture[_shortid.default.generate()] = result.art;
                            artPicture[_shortid.default.generate()] = result.art_trained;
                          }
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
            if (_lodash.default.values(artPicture).length > _lodash.default.values(_bandoriArtCards.default).length) {
              _fs.default.writeFileSync(_path.default.join(__dirname, '../static/bandori-art-cards.json'), JSON.stringify(artPicture));
            }

            return _context2.abrupt("return", artPicture);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getArtPictures() {
    return _ref.apply(this, arguments);
  };
}();

var getRandomPictures =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var pageSize, _ref3$existingIds, existingIds, randomKeys;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pageSize = _ref3.pageSize, _ref3$existingIds = _ref3.existingIds, existingIds = _ref3$existingIds === void 0 ? [] : _ref3$existingIds;
            pageSize = parseInt(pageSize);
            if (!_lodash.default.isFinite(pageSize) || pageSize < 1) pageSize = 20;
            randomKeys = _lodash.default.chain(_bandoriArtCards.default).keys().difference(existingIds).shuffle().slice(0, pageSize).value();
            return _context3.abrupt("return", _lodash.default.pick(_bandoriArtCards.default, randomKeys));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getRandomPictures(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = {
  getArtPictures: getArtPictures,
  getRandomPictures: getRandomPictures
};
exports.default = _default;