"use strict";

exports.__esModule = true;
exports.default = void 0;

var _formFile = require("./form-file");

var _plugins = require("../../utils/plugins");

var components = {
  BFormFile: _formFile.default,
  BFile: _formFile.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;