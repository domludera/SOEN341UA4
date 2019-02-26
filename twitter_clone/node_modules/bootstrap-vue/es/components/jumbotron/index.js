"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jumbotron = require("./jumbotron");

var _plugins = require("../../utils/plugins");

var components = {
  BJumbotron: _jumbotron.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;