"use strict";

exports.__esModule = true;
exports.default = void 0;

var _popper = require("popper.js");

var _tooltip = require("../../utils/tooltip.class");

var _object = require("../../utils/object");

var _warn = require("../../utils/warn");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'; // Key which we use to store tooltip object on element

var BVTT = '__BV_ToolTip__'; // Valid event triggers

var validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true // Build a ToolTip config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object

  /* istanbul ignore next: not easy to test */

};

function parseBindings(bindings) {
  // We start out with a blank config
  var config = {}; // Process bindings.value

  if (typeof bindings.value === 'string') {
    // Value is tooltip content (html optionally supported)
    config.title = bindings.value;
  } else if (typeof bindings.value === 'function') {
    // Title generator function
    config.title = bindings.value;
  } else if (_typeof(bindings.value) === 'object') {
    // Value is config object, so merge
    config = _objectSpread({}, config, bindings.value);
  } // If Argument, assume element ID of container element


  if (bindings.arg) {
    // Element ID specified as arg. We must prepend '#' to become a CSS selector
    config.container = "#".concat(bindings.arg);
  } // Process modifiers


  (0, _object.keys)(bindings.modifiers).forEach(function (mod) {
    if (/^html$/.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (/^nofade$/.test(mod)) {
      // no animation
      config.animation = false;
    } else if (/^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)) {
      // placement of tooltip
      config.placement = mod;
    } else if (/^(window|viewport)$/.test(mod)) {
      // bounday of tooltip
      config.boundary = mod;
    } else if (/^d\d+$/.test(mod)) {
      // delay value
      var delay = parseInt(mod.slice(1), 10) || 0;

      if (delay) {
        config.delay = delay;
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // offset value. Negative allowed
      var offset = parseInt(mod.slice(1), 10) || 0;

      if (offset) {
        config.offset = offset;
      }
    }
  }); // Special handling of event trigger modifiers Trigger is a space separated list

  var selectedTriggers = {}; // parse current config object trigger

  var triggers = typeof config.trigger === 'string' ? config.trigger.trim().split(/\s+/) : [];
  triggers.forEach(function (trigger) {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Parse Modifiers for triggers

  (0, _object.keys)(validTriggers).forEach(function (trigger) {
    if (bindings.modifiers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Sanitize triggers

  config.trigger = (0, _object.keys)(selectedTriggers).join(' ');

  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus';
  }

  if (!config.trigger) {
    // remove trigger config
    delete config.trigger;
  }

  return config;
} //
// Add or Update tooltip on our element
//

/* istanbul ignore next: not easy to test */


function applyBVTT(el, bindings, vnode) {
  if (!inBrowser) {
    return;
  }

  if (!_popper.default) {
    // Popper is required for tooltips to work
    (0, _warn.default)('v-b-tooltip: Popper.js is required for tooltips to work');
    return;
  }

  if (el[BVTT]) {
    el[BVTT].updateConfig(parseBindings(bindings));
  } else {
    el[BVTT] = new _tooltip.default(el, parseBindings(bindings), vnode.context.$root);
  }
} //
// Remove tooltip on our element
//

/* istanbul ignore next: not easy to test */


function removeBVTT(el) {
  if (!inBrowser) {
    return;
  }

  if (el[BVTT]) {
    el[BVTT].destroy();
    el[BVTT] = null;
    delete el[BVTT];
  }
}
/*
 * Export our directive
 */

/* istanbul ignore next: not easy to test */


var _default = {
  bind: function bind(el, bindings, vnode) {
    applyBVTT(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode) {
    applyBVTT(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVTT(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVTT(el, bindings, vnode);
    }
  },
  unbind: function unbind(el) {
    removeBVTT(el);
  }
};
exports.default = _default;