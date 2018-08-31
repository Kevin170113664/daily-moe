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

const getLatestCards = async () => {
  const cardIds = await _request2.default.get(`${baseUrl}/cardids`);
  const pages = _lodash2.default.range(1, Math.ceil(cardIds.length / 120) + 1);

  const cards = await Promise.all(_lodash2.default.map(pages, async page => {
    const res = await _request2.default.get(`${baseUrl}/cards?page=${page}&page_size=120`);
    return _lodash2.default.reduce(res.results, (results, result) => {
      if (!_lodash2.default.isEmpty(result.art)) results.push(result.art);
      if (!_lodash2.default.isEmpty(result.art_trained)) results.push(result.art_trained);
      return results;
    }, []);
  }));

  return _lodash2.default.flatten(cards);
};

exports.default = { getLatestCards };