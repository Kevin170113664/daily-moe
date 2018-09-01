'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _request = require('../helper/request');

var _request2 = _interopRequireDefault(_request);

var _loveliveCleanCards = require('../static/lovelive-clean-cards');

var _loveliveCleanCards2 = _interopRequireDefault(_loveliveCleanCards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const baseUrl = 'https://schoolido.lu/api';

const getCleanCards = (() => {
  var _ref = _asyncToGenerator(function* () {
    const maxPageSize = 100;
    const res = yield _request2.default.get(`${baseUrl}/cards/?page_size=1&rarity=UR,SSR`);
    const pages = _lodash2.default.range(1, Math.ceil(res.count / maxPageSize) + 1);

    const cleanPicture = {};
    yield Promise.all(_lodash2.default.map(pages, (() => {
      var _ref2 = _asyncToGenerator(function* (page) {
        const res = yield _request2.default.get(`${baseUrl}/cards/?page=${page}&page_size=${maxPageSize}&rarity=UR,SSR`);
        _lodash2.default.each(res.results, function (result) {
          if (!_lodash2.default.isEmpty(result.clean_ur)) cleanPicture[_shortid2.default.generate()] = `https:${result.clean_ur}`;
          if (!_lodash2.default.isEmpty(result.clean_ur_idolized)) cleanPicture[_shortid2.default.generate()] = `https:${result.clean_ur_idolized}`;
        });
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })()));

    if (_lodash2.default.values(cleanPicture).length > _lodash2.default.values(_loveliveCleanCards2.default).length) {
      const staticJSONPath = _path2.default.join(__dirname, '../static/lovelive-clean-cards.json');
      _fs2.default.writeFileSync(staticJSONPath, JSON.stringify(_loveliveCleanCards2.default));
    }

    return cleanPicture;
  });

  return function getCleanCards() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = { getCleanCards };