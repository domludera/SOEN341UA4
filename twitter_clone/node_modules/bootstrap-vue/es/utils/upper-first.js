"use strict";

exports.__esModule = true;
exports.default = upperFirst;

/**
 * @param {string} str
 */
function upperFirst(str) {
  if (typeof str !== 'string') {
    str = String(str);
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}