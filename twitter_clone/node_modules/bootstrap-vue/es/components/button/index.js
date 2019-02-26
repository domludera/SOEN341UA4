"use strict";

exports.__esModule = true;
exports.default = void 0;

var _button = require("./button");

var _buttonClose = require("./button-close");

var _plugins = require("../../utils/plugins");

var components = {
  BButton: _button.default,
  BBtn: _button.default,
  BButtonClose: _buttonClose.default,
  BBtnClose: _buttonClose.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;