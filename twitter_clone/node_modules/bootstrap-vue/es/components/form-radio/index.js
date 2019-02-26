"use strict";

exports.__esModule = true;
exports.default = void 0;

var _formRadio = require("./form-radio");

var _formRadioGroup = require("./form-radio-group");

var _plugins = require("../../utils/plugins");

var components = {
  BFormRadio: _formRadio.default,
  BRadio: _formRadio.default,
  BFormRadioGroup: _formRadioGroup.default,
  BRadioGroup: _formRadioGroup.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;