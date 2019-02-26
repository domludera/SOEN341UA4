"use strict";

exports.__esModule = true;
exports.default = void 0;

var _progress = require("./progress");

var _progressBar = require("./progress-bar");

var _plugins = require("../../utils/plugins");

var components = {
  BProgress: _progress.default,
  BProgressBar: _progressBar.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;