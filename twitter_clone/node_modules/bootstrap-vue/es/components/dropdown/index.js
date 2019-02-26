"use strict";

exports.__esModule = true;
exports.default = void 0;

var _dropdown = require("./dropdown");

var _dropdownItem = require("./dropdown-item");

var _dropdownItemButton = require("./dropdown-item-button");

var _dropdownHeader = require("./dropdown-header");

var _dropdownDivider = require("./dropdown-divider");

var _dropdownForm = require("./dropdown-form");

var _dropdownText = require("./dropdown-text");

var _plugins = require("../../utils/plugins");

var components = {
  BDropdown: _dropdown.default,
  BDd: _dropdown.default,
  BDropdownItem: _dropdownItem.default,
  BDdItem: _dropdownItem.default,
  BDropdownItemButton: _dropdownItemButton.default,
  BDropdownItemBtn: _dropdownItemButton.default,
  BDdItemButton: _dropdownItemButton.default,
  BDdItemBtn: _dropdownItemButton.default,
  BDropdownHeader: _dropdownHeader.default,
  BDdHeader: _dropdownHeader.default,
  BDropdownDivider: _dropdownDivider.default,
  BDdDivider: _dropdownDivider.default,
  BDropdownForm: _dropdownForm.default,
  BDdForm: _dropdownForm.default,
  BDropdownText: _dropdownText.default,
  BDdText: _dropdownText.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;