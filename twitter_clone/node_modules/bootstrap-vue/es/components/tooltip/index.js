"use strict";

exports.__esModule = true;
exports.default = void 0;

var _tooltip = require("./tooltip");

var _tooltip2 = require("../../directives/tooltip");

var _plugins = require("../../utils/plugins");

var components = {
  BTooltip: _tooltip.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
    Vue.use(_tooltip2.default);
  }
};
exports.default = _default;