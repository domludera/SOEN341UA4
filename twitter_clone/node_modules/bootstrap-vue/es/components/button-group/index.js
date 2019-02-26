"use strict";

exports.__esModule = true;
exports.default = void 0;

var _buttonGroup = require("./button-group");

var _plugins = require("../../utils/plugins");

var components = {
  BButtonGroup: _buttonGroup.default,
  BBtnGroup: _buttonGroup.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;