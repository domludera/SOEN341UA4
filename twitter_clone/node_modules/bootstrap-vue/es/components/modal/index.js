"use strict";

exports.__esModule = true;
exports.default = void 0;

var _modal = require("./modal");

var _modal2 = require("../../directives/modal");

var _plugins = require("../../utils/plugins");

var components = {
  BModal: _modal.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
    Vue.use(_modal2.default);
  }
};
exports.default = _default;