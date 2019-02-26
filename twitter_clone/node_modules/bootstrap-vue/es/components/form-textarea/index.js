"use strict";

exports.__esModule = true;
exports.default = void 0;

var _formTextarea = require("./form-textarea");

var _plugins = require("../../utils/plugins");

var components = {
  BFormTextarea: _formTextarea.default,
  BTextarea: _formTextarea.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;