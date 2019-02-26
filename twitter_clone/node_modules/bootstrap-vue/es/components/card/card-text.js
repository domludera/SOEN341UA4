"use strict";

exports.__esModule = true;
exports.default = exports.props = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var props = {
  textTag: {
    type: String,
    default: 'p'
  } // @vue/component

};
exports.props = props;
var _default = {
  name: 'BCardText',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.textTag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card-text'
    }), children);
  }
};
exports.default = _default;