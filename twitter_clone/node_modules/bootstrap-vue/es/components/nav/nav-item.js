"use strict";

exports.__esModule = true;
exports.default = exports.props = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _link = require("../link/link");

var props = (0, _link.propsFactory)(); // @vue/component

exports.props = props;
var _default = {
  name: 'BNavItem',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'nav-item'
    }), [h(_link.default, {
      staticClass: 'nav-link',
      props: props
    }, children)]);
  }
};
exports.default = _default;