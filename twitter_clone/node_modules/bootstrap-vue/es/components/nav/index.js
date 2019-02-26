"use strict";

exports.__esModule = true;
exports.default = void 0;

var _nav = require("./nav");

var _navItem = require("./nav-item");

var _navText = require("./nav-text");

var _navForm = require("./nav-form");

var _navItemDropdown = require("./nav-item-dropdown");

var _dropdown = require("../dropdown");

var _plugins = require("../../utils/plugins");

var components = {
  BNav: _nav.default,
  BNavItem: _navItem.default,
  BNavText: _navText.default,
  BNavForm: _navForm.default,
  BNavItemDropdown: _navItemDropdown.default,
  BNavItemDd: _navItemDropdown.default,
  BNavDropdown: _navItemDropdown.default,
  BNavDd: _navItemDropdown.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
    Vue.use(_dropdown.default);
  }
};
exports.default = _default;