"use strict";

exports.__esModule = true;
exports.default = void 0;

var _alert = require("./alert");

var _plugins = require("../../utils/plugins");

var components = {
  BAlert: _alert.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;