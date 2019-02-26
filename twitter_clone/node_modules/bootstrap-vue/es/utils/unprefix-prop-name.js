"use strict";

exports.__esModule = true;
exports.default = unPrefixPropName;

var _lowerFirst = require("./lower-first");

/**
 * @param {string} prefix
 * @param {string} value
 */
function unPrefixPropName(prefix, value) {
  return (0, _lowerFirst.default)(value.replace(prefix, ''));
}