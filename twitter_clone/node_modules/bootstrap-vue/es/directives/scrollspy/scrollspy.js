"use strict";

exports.__esModule = true;
exports.default = void 0;

var _scrollspy = require("./scrollspy.class");

var _object = require("../../utils/object");

var _env = require("../../utils/env");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Key we use to store our Instance
var BVSS = '__BV_ScrollSpy__'; // Generate config from bindings

function makeConfig(binding)
/* istanbul ignore next: not easy to test */
{
  var config = {}; // If Argument, assume element ID

  if (binding.arg) {
    // Element ID specified as arg. We must pre-pend #
    config.element = '#' + binding.arg;
  } // Process modifiers


  (0, _object.keys)(binding.modifiers).forEach(function (mod) {
    if (/^\d+$/.test(mod)) {
      // Offest value
      config.offset = parseInt(mod, 10);
    } else if (/^(auto|position|offset)$/.test(mod)) {
      // Offset method
      config.method = mod;
    }
  }); // Process value

  if (typeof binding.value === 'string') {
    // Value is a CSS ID or selector
    config.element = binding.value;
  } else if (typeof binding.value === 'number') {
    // Value is offset
    config.offset = Math.round(binding.value);
  } else if (_typeof(binding.value) === 'object') {
    // Value is config object
    // Filter the object based on our supported config options
    (0, _object.keys)(binding.value).filter(function (k) {
      return Boolean(_scrollspy.default.DefaultType[k]);
    }).forEach(function (k) {
      config[k] = binding.value[k];
    });
  }

  return config;
}

function addBVSS(el, binding, vnode)
/* istanbul ignore next: not easy to test */
{
  if (_env.isServer) {
    return;
  }

  var cfg = makeConfig(binding);

  if (!el[BVSS]) {
    el[BVSS] = new _scrollspy.default(el, cfg, vnode.context.$root);
  } else {
    el[BVSS].updateConfig(cfg, vnode.context.$root);
  }

  return el[BVSS];
}

function removeBVSS(el)
/* istanbul ignore next: not easy to test */
{
  if (el[BVSS]) {
    el[BVSS].dispose();
    el[BVSS] = null;
  }
}
/*
 * Export our directive
 */


var _default = {
  bind: function bind(el, binding, vnode)
  /* istanbul ignore next: not easy to test */
  {
    addBVSS(el, binding, vnode);
  },
  inserted: function inserted(el, binding, vnode)
  /* istanbul ignore next: not easy to test */
  {
    addBVSS(el, binding, vnode);
  },
  update: function update(el, binding, vnode)
  /* istanbul ignore next: not easy to test */
  {
    addBVSS(el, binding, vnode);
  },
  componentUpdated: function componentUpdated(el, binding, vnode)
  /* istanbul ignore next: not easy to test */
  {
    addBVSS(el, binding, vnode);
  },
  unbind: function unbind(el)
  /* istanbul ignore next: not easy to test */
  {
    if (_env.isServer) {
      return;
    } // Remove scroll event listener on scrollElId


    removeBVSS(el);
  }
};
exports.default = _default;