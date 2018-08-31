'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request = require('../helper/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseUrl = 'https://bandori.party/api';

const getArtPictures = async () => {
  const maxPageSize = 120;
  const cardIds = await _request2.default.get(`${baseUrl}/cardids`);
  const pages = _lodash2.default.range(1, Math.ceil(cardIds.length / maxPageSize) + 1);

  const cards = await Promise.all(_lodash2.default.map(pages, async page => {
    const res = await _request2.default.get(`${baseUrl}/cards?page=${page}&page_size=${maxPageSize}`);
    return _lodash2.default.reduce(res.results, (results, result) => {
      if (!_lodash2.default.isEmpty(result.art) && !_lodash2.default.isEmpty(result.art_trained)) {
        results.push(result.art);
        results.push(result.art_trained);
      }
      return results;
    }, []);
  }));

  return _lodash2.default.flatten(cards);
};

exports.default = { getArtPictures };