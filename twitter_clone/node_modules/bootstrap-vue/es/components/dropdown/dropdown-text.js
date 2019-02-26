"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _default = {
  name: 'BDropdownText',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'p'
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      props: props,
      staticClass: 'b-dropdown-text'
    }), children);
  }
};
exports.default = _default;