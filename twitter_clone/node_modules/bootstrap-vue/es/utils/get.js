"use strict";

exports.__esModule = true;
exports.default = get;

/**
 * Get property defined by dot notation in string.
 *
 * Copyright (C) 2014 (UNLICENSE)
 * @author Dmitry Yv <https://github.com/dy>
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @return {*}          A property value
 */
function get(holder, propName) {
  if (propName === undefined) {
    return holder;
  }

  var propParts = (propName + '').split('.');
  var result = holder;
  var lastPropName;

  while ((lastPropName = propParts.shift()) !== undefined && // Fix for https://github.com/bootstrap-vue/bootstrap-vue/issues/2623
  result !== undefined && result !== null) {
    if (result[lastPropName] === undefined) return undefined;
    result = result[lastPropName];
  }

  return result;
}