"use strict";

exports.__esModule = true;
exports.default = void 0;

var _form = require("../form/form");

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

// @vue/component
var _default = {
  name: 'BNavForm',
  functional: true,
  props: {
    id: {
      type: String,
      default: null
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(_form.default, (0, _vueFunctionalDataMerge.mergeData)(data, {
      attrs: {
        id: props.id
      },
      props: {
        inline: true
      }
    }), children);
  }
};
exports.default = _default;