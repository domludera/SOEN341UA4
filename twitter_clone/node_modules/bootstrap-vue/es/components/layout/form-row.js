"use strict";

exports.__esModule = true;
exports.default = exports.props = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var props = {
  tag: {
    type: String,
    default: 'div'
  } // @vue/component

};
exports.props = props;
var _default = {
  name: 'BFormRow',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'form-row'
    }), children);
  }
};
exports.default = _default;