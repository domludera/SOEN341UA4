"use strict";

exports.__esModule = true;
exports.default = exports.props = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var props = {
  tag: {
    type: String,
    default: 'div'
  },
  deck: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.props = props;
var _default = {
  name: 'BCardGroup',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var baseClass = 'card-group';

    if (props.deck) {
      baseClass = 'card-deck';
    } else if (props.columns) {
      baseClass = 'card-columns';
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: baseClass
    }), children);
  }
};
exports.default = _default;