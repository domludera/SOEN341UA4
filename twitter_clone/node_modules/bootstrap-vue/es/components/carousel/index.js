"use strict";

exports.__esModule = true;
exports.default = void 0;

var _carousel = require("./carousel");

var _carouselSlide = require("./carousel-slide");

var _plugins = require("../../utils/plugins");

var components = {
  BCarousel: _carousel.default,
  BCarouselSlide: _carouselSlide.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;