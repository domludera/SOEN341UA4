"use strict";

exports.__esModule = true;
exports.default = void 0;

var _pagination = require("./pagination");

var _plugins = require("../../utils/plugins");

var components = {
  BPagination: _pagination.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;