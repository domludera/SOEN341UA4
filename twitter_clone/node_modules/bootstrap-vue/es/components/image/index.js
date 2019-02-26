"use strict";

exports.__esModule = true;
exports.default = void 0;

var _img = require("./img");

var _imgLazy = require("./img-lazy");

var _plugins = require("../../utils/plugins");

var components = {
  BImg: _img.default,
  BImgLazy: _imgLazy.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;