"use strict";

exports.__esModule = true;
exports.default = void 0;

var _table = require("./table");

var _plugins = require("../../utils/plugins");

var components = {
  BTable: _table.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;