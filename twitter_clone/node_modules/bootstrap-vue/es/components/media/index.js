"use strict";

exports.__esModule = true;
exports.default = void 0;

var _media = require("./media");

var _mediaAside = require("./media-aside");

var _mediaBody = require("./media-body");

var _plugins = require("../../utils/plugins");

var components = {
  BMedia: _media.default,
  BMediaAside: _mediaAside.default,
  BMediaBody: _mediaBody.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;