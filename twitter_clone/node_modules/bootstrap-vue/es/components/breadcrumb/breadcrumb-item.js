"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _breadcrumbLink = require("./breadcrumb-link");

// @vue/component
var _default = {
  name: 'BBreadcrumbItem',
  functional: true,
  props: _breadcrumbLink.props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'breadcrumb-item',
      class: {
        active: props.active
      },
      attrs: {
        role: 'presentation'
      }
    }), [h(_breadcrumbLink.default, {
      props: props
    }, children)]);
  }
};
exports.default = _default;