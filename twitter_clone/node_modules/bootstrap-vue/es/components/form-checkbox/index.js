"use strict";

exports.__esModule = true;
exports.default = void 0;

var _formCheckbox = require("./form-checkbox");

var _formCheckboxGroup = require("./form-checkbox-group");

var _plugins = require("../../utils/plugins");

var components = {
  BFormCheckbox: _formCheckbox.default,
  BCheckbox: _formCheckbox.default,
  BCheck: _formCheckbox.default,
  BFormCheckboxGroup: _formCheckboxGroup.default,
  BCheckboxGroup: _formCheckboxGroup.default,
  BCheckGroup: _formCheckboxGroup.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;