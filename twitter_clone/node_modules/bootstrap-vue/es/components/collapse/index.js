"use strict";

exports.__esModule = true;
exports.default = void 0;

var _collapse = require("./collapse");

var _toggle = require("../../directives/toggle");

var _plugins = require("../../utils/plugins");

var components = {
  BCollapse: _collapse.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
    Vue.use(_toggle.default);
  }
};
exports.default = _default;