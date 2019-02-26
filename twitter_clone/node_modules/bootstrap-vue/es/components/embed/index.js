"use strict";

exports.__esModule = true;
exports.default = void 0;

var _embed = require("./embed");

var _plugins = require("../../utils/plugins");

var components = {
  BEmbed: _embed.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;