"use strict";

exports.__esModule = true;
exports.default = void 0;

var _plugins = require("../../utils/plugins");

var _inputGroup = require("./input-group");

var _inputGroupAddon = require("./input-group-addon");

var _inputGroupPrepend = require("./input-group-prepend");

var _inputGroupAppend = require("./input-group-append");

var _inputGroupText = require("./input-group-text");

var components = {
  BInputGroup: _inputGroup.default,
  BInputGroupAddon: _inputGroupAddon.default,
  BInputGroupPrepend: _inputGroupPrepend.default,
  BInputGroupAppend: _inputGroupAppend.default,
  BInputGroupText: _inputGroupText.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;