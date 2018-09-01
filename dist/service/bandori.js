'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _request = require('../helper/request');

var _request2 = _interopRequireDefault(_request);

var _artPictures = require('../static/bandori/art-pictures');

var _artPictures2 = _interopRequireDefault(_artPictures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseUrl = 'https://bandori.party/api';

const getArtPictures = async () => {
  const maxPageSize = 120;
  const cardIds = await _request2.default.get(`${baseUrl}/cardids`);
  const pages = _lodash2.default.range(1, Math.ceil(cardIds.length / maxPageSize) + 1);

  const artPicture = {};
  await Promise.all(_lodash2.default.map(pages, async page => {
    const res = await _request2.default.get(`${baseUrl}/cards?page=${page}&page_size=${maxPageSize}`);
    _lodash2.default.each(res.results, result => {
      if (!_lodash2.default.isEmpty(result.art) && !_lodash2.default.isEmpty(result.art_trained)) {
        artPicture[_shortid2.default.generate()] = result.art;
        artPicture[_shortid2.default.generate()] = result.art_trained;
      }
    });
  }));

  return artPicture;
};

const getRandomPictures = async ({ pageSize, existingIds = [] }) => {
  if (!_lodash2.default.isFinite(pageSize) || pageSize < 1) pageSize = 20;

  const randomKeys = _lodash2.default.chain(_artPictures2.default).keys().difference(existingIds).shuffle().slice(0, pageSize).value();

  return _lodash2.default.pick(_artPictures2.default, randomKeys);
};

exports.default = { getArtPictures, getRandomPictures };