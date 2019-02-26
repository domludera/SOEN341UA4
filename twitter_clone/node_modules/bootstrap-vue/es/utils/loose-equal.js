"use strict";

exports.__esModule = true;
exports.default = void 0;

var _array = require("./array");

var _object = require("./object");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isDate(obj) {
  return obj instanceof Date;
}

function isFile(obj) {
  return obj instanceof File;
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * Note object could be a complex type like array, date, etc.
 */


function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * Returns boolean true or false
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (_typeof(a) !== _typeof(b)) {
    return false;
  }

  var validTypesCount = [isDate(a), isDate(b)].filter(Boolean).length;

  if (validTypesCount > 0) {
    return validTypesCount === 2 ? a.getTime() === b.getTime() : false;
  }

  validTypesCount = [isFile(a), isFile(b)].filter(Boolean).length;

  if (validTypesCount > 0) {
    return validTypesCount === 2 ? a === b : false;
  }

  validTypesCount = [(0, _array.isArray)(a), (0, _array.isArray)(b)].filter(Boolean).length;

  if (validTypesCount > 0) {
    return validTypesCount === 2 ? a.length === b.length && a.every(function (e, i) {
      return looseEqual(e, b[i]);
    }) : false;
  }

  validTypesCount = [isObject(a), isObject(b)].filter(Boolean).length;

  if (validTypesCount > 0) {
    /* istanbul ignore if: this if will probably never be called */
    if (validTypesCount === 1) {
      return false;
    }

    var aKeysCount = (0, _object.keys)(a).length;
    var bKeysCount = (0, _object.keys)(b).length;

    if (aKeysCount !== bKeysCount) {
      return false;
    }

    if (aKeysCount === 0 && bKeysCount === 0) {
      return String(a) === String(b);
    } // Using for loop over `Object.keys()` here since some class
    // keys are not handled correctly otherwise


    for (var key in a) {
      if ([a.hasOwnProperty(key), b.hasOwnProperty(key)].filter(Boolean).length === 1 || !looseEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

var _default = looseEqual;
exports.default = _default;