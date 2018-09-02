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

var _cinderellaSpreadCards = _interopRequireDefault(require("../static/cinderella-spread-cards"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var baseUrl = 'https://starlight.kirara.ca/api';

var getImageUrl = function getImageUrl(id) {
  return "https://truecolor.kirara.ca/spread/".concat(id, ".png");
};

var getSpreadCards =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var res, cardIds, spreadPicture, staticJSONPath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _request.default.get("".concat(baseUrl, "/v1/list/card_t"));

          case 2:
            res = _context.sent;
            cardIds = _lodash.default.chain(res.result).filter({
              has_spread: true
            }).map('id').value();
            spreadPicture = _lodash.default.reduce(cardIds, function (current, cardId) {
              current[_shortid.default.generate()] = getImageUrl(cardId);
              return current;
            }, {});

            if (_lodash.default.values(spreadPicture).length > _lodash.default.values(_cinderellaSpreadCards.default).length) {
              staticJSONPath = _path.default.join(__dirname, '../static/cinderella-spread-cards.json');

              _fs.default.writeFileSync(staticJSONPath, JSON.stringify(spreadPicture));
            }

            return _context.abrupt("return", spreadPicture);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getSpreadCards() {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  getSpreadCards: getSpreadCards
};
exports.default = _default;