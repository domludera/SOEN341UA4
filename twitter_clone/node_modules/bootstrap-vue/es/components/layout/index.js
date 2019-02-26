"use strict";

exports.__esModule = true;
exports.default = void 0;

var _container = require("./container");

var _row = require("./row");

var _col = require("./col");

var _formRow = require("./form-row");

var _plugins = require("../../utils/plugins");

var components = {
  BContainer: _container.default,
  BRow: _row.default,
  BCol: _col.default,
  BFormRow: _formRow.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;