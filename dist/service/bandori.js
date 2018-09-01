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

var _bandoriArtCards = require('../static/bandori-art-cards');

var _bandoriArtCards2 = _interopRequireDefault(_bandoriArtCards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const baseUrl = 'https://bandori.party/api';

const getArtPictures = (() => {
  var _ref = _asyncToGenerator(function* () {
    const maxPageSize = 120;
    const cardIds = yield _request2.default.get(`${baseUrl}/cardids`);
    const pages = _lodash2.default.range(1, Math.ceil(cardIds.length / maxPageSize) + 1);

    const artPicture = {};
    yield Promise.all(_lodash2.default.map(pages, (() => {
      var _ref2 = _asyncToGenerator(function* (page) {
        const res = yield _request2.default.get(`${baseUrl}/cards?page=${page}&page_size=${maxPageSize}`);
        _lodash2.default.each(res.results, function (result) {
          if (!_lodash2.default.isEmpty(result.art) && !_lodash2.default.isEmpty(result.art_trained)) {
            artPicture[_shortid2.default.generate()] = result.art;
            artPicture[_shortid2.default.generate()] = result.art_trained;
          }
        });
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })()));

    if (_lodash2.default.values(artPicture).length > _lodash2.default.values(_bandoriArtCards2.default).length) {
      _fs2.default.writeFileSync(_path2.default.join(__dirname, '../static/bandori-art-cards.json'), JSON.stringify(artPicture));
    }

    return artPicture;
  });

  return function getArtPictures() {
    return _ref.apply(this, arguments);
  };
})();

const getRandomPictures = (() => {
  var _ref3 = _asyncToGenerator(function* ({ pageSize, existingIds = [] }) {
    if (!_lodash2.default.isFinite(pageSize) || pageSize < 1) pageSize = 20;

    const randomKeys = _lodash2.default.chain(_bandoriArtCards2.default).keys().difference(existingIds).shuffle().slice(0, pageSize).value();

    return _lodash2.default.pick(_bandoriArtCards2.default, randomKeys);
  });

  return function getRandomPictures(_x2) {
    return _ref3.apply(this, arguments);
  };
})();

exports.default = { getArtPictures, getRandomPictures };