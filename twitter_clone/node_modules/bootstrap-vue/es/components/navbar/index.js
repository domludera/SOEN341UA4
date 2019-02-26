"use strict";

exports.__esModule = true;
exports.default = void 0;

var _navbar = require("./navbar");

var _navbarNav = require("./navbar-nav");

var _navbarBrand = require("./navbar-brand");

var _navbarToggle = require("./navbar-toggle");

var _nav = require("../nav");

var _collapse = require("../collapse");

var _dropdown = require("../dropdown");

var _plugins = require("../../utils/plugins");

var components = {
  BNavbar: _navbar.default,
  BNavbarNav: _navbarNav.default,
  BNavbarBrand: _navbarBrand.default,
  BNavbarToggle: _navbarToggle.default,
  BNavToggle: _navbarToggle.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
    Vue.use(_nav.default);
    Vue.use(_collapse.default);
    Vue.use(_dropdown.default);
  }
};
exports.default = _default;