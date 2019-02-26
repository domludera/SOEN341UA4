"use strict";

exports.__esModule = true;
exports.default = void 0;

var _formGroup = require("./form-group");

var _plugins = require("../../utils/plugins");

var components = {
  BFormGroup: _formGroup.default,
  BFormFieldset: _formGroup.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;