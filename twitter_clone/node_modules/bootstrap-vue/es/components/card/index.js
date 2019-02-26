"use strict";

exports.__esModule = true;
exports.default = void 0;

var _card = require("./card");

var _cardHeader = require("./card-header");

var _cardBody = require("./card-body");

var _cardTitle = require("./card-title");

var _cardSubTitle = require("./card-sub-title");

var _cardFooter = require("./card-footer");

var _cardImg = require("./card-img");

var _cardText = require("./card-text");

var _cardGroup = require("./card-group");

var _plugins = require("../../utils/plugins");

var components = {
  BCard: _card.default,
  BCardHeader: _cardHeader.default,
  BCardBody: _cardBody.default,
  BCardTitle: _cardTitle.default,
  BCardSubTitle: _cardSubTitle.default,
  BCardFooter: _cardFooter.default,
  BCardImg: _cardImg.default,
  BCardText: _cardText.default,
  BCardGroup: _cardGroup.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;