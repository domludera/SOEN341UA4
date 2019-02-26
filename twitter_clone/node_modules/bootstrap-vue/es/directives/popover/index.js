"use strict";

exports.__esModule = true;
exports.default = void 0;

var _popover = require("./popover");

var _plugins = require("../../utils/plugins");

var directives = {
  bPopover: _popover.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerDirectives)(Vue, directives);
  }
};
exports.default = _default;