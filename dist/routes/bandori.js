'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bandori = require('../service/bandori');

var _bandori2 = _interopRequireDefault(_bandori);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/artCards', async (req, res, next) => {
  try {
    const card = await _bandori2.default.getArtPictures();
    return res.json(card);
  } catch (e) {
    next(e);
  }
});

router.get('/randomCards', async (req, res, next) => {
  try {
    const { pageSize, existingIds } = req.query;
    const card = await _bandori2.default.getRandomPictures({ pageSize, existingIds });
    return res.json(card);
  } catch (e) {
    next(e);
  }
});

exports.default = router;