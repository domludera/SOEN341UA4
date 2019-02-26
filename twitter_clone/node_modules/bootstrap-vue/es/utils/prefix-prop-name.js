"use strict";

exports.__esModule = true;
exports.default = prefixPropName;

var _upperFirst = require("./upper-first");

/**
 * @param {string} prefix
 * @param {string} value
 */
function prefixPropName(prefix, value) {
  return prefix + (0, _upperFirst.default)(value);
}