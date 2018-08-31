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
    const cards = await _bandori2.default.getArtPictures();
    return res.json(cards);
  } catch (e) {
    next(e);
  }
});

exports.default = router;