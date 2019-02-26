"use strict";

exports.__esModule = true;
exports.default = void 0;

var _buttonToolbar = require("./button-toolbar");

var _plugins = require("../../utils/plugins");

var components = {
  BButtonToolbar: _buttonToolbar.default,
  BBtnToolbar: _buttonToolbar.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;