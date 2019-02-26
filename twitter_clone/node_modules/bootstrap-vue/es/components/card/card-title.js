"use strict";

exports.__esModule = true;
exports.default = exports.props = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var props = {
  title: {
    type: String,
    default: ''
  },
  titleTag: {
    type: String,
    default: 'h4'
  } // @vue/component

};
exports.props = props;
var _default = {
  name: 'BCardTitle',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.titleTag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card-title'
    }), children || props.title);
  }
};
exports.default = _default;