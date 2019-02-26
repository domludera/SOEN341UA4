"use strict";

exports.__esModule = true;
exports.default = memoize;

var _object = require("./object");

function memoize(fn) {
  var cache = (0, _object.create)(null);
  return function memoizedFn() {
    var args = JSON.stringify(arguments);
    return cache[args] = cache[args] || fn.apply(null, arguments);
  };
}