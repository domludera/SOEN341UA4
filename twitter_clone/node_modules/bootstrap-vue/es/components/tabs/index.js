"use strict";

exports.__esModule = true;
exports.default = void 0;

var _tabs = require("./tabs");

var _tab = require("./tab");

var _plugins = require("../../utils/plugins");

var components = {
  BTabs: _tabs.default,
  BTab: _tab.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;