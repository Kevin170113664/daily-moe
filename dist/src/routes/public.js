'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _public = require('../service/public');

var _public2 = _interopRequireDefault(_public);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = _express2.default.Router();

router.post('/randomCards', (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const { pageSize } = req.query;
      const { existingIds } = req.body;
      const result = yield _public2.default.getRandomPictures({ pageSize, existingIds });
      return res.json(result);
    } catch (e) {
      next(e);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

exports.default = router;