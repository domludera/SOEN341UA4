"use strict";

exports.__esModule = true;
exports.default = void 0;

var _breadcrumb = require("./breadcrumb");

var _breadcrumbItem = require("./breadcrumb-item");

var _breadcrumbLink = require("./breadcrumb-link");

var _plugins = require("../../utils/plugins");

var components = {
  BBreadcrumb: _breadcrumb.default,
  BBreadcrumbItem: _breadcrumbItem.default,
  BBreadcrumbLink: _breadcrumbLink.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;