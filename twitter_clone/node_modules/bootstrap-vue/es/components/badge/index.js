"use strict";

exports.__esModule = true;
exports.default = void 0;

var _badge = require("./badge");

var _plugins = require("../../utils/plugins");

var components = {
  BBadge: _badge.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;