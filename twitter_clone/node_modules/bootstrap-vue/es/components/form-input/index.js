"use strict";

exports.__esModule = true;
exports.default = void 0;

var _formInput = require("./form-input");

var _plugins = require("../../utils/plugins");

var components = {
  BFormInput: _formInput.default,
  BInput: _formInput.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;