"use strict";

exports.__esModule = true;
exports.default = void 0;

var _listGroup = require("./list-group");

var _listGroupItem = require("./list-group-item");

var _plugins = require("../../utils/plugins");

var components = {
  BListGroup: _listGroup.default,
  BListGroupItem: _listGroupItem.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;