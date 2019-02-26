"use strict";

exports.__esModule = true;
exports.default = exports.props = exports.computeBkPtClass = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _memoize = require("../../utils/memoize");

var _suffixPropName = require("../../utils/suffix-prop-name");

var _object = require("../../utils/object");

var _array = require("../../utils/array");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Generates a prop object with a type of
 * [Boolean, String, Number]
 */
function boolStrNum() {
  return {
    type: [Boolean, String, Number],
    default: false
  };
}
/**
 * Generates a prop object with a type of
 * [String, Number]
 */


function strNum() {
  return {
    type: [String, Number],
    default: null
  };
}

var computeBkPtClass = (0, _memoize.default)(function computeBkPt(type, breakpoint, val) {
  var className = type;

  if (val === false || val === null || val === undefined) {
    return undefined;
  }

  if (breakpoint) {
    className += "-".concat(breakpoint);
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <b-col sm /> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += "-".concat(val);
  return className.toLowerCase();
});
exports.computeBkPtClass = computeBkPtClass;
var BREAKPOINTS = ['sm', 'md', 'lg', 'xl']; // Supports classes like: .col-sm, .col-md-6, .col-lg-auto

var breakpointCol = BREAKPOINTS.reduce( // eslint-disable-next-line no-sequences
function (propMap, breakpoint) {
  return propMap[breakpoint] = boolStrNum(), propMap;
}, (0, _object.create)(null)); // Supports classes like: .offset-md-1, .offset-lg-12

var breakpointOffset = BREAKPOINTS.reduce( // eslint-disable-next-line no-sequences
function (propMap, breakpoint) {
  return propMap[(0, _suffixPropName.default)(breakpoint, 'offset')] = strNum(), propMap;
}, (0, _object.create)(null)); // Supports classes like: .order-md-1, .order-lg-12

var breakpointOrder = BREAKPOINTS.reduce( // eslint-disable-next-line no-sequences
function (propMap, breakpoint) {
  return propMap[(0, _suffixPropName.default)(breakpoint, 'order')] = strNum(), propMap;
}, (0, _object.create)(null)); // For loop doesn't need to check hasOwnProperty
// when using an object created from null

var breakpointPropMap = (0, _object.assign)((0, _object.create)(null), {
  col: (0, _object.keys)(breakpointCol),
  offset: (0, _object.keys)(breakpointOffset),
  order: (0, _object.keys)(breakpointOrder)
});

var props = _objectSpread({}, breakpointCol, breakpointOffset, breakpointOrder, {
  tag: {
    type: String,
    default: 'div'
  },
  // Generic flexbox .col
  col: {
    type: Boolean,
    default: false
  },
  // .col-[1-12]|auto
  cols: strNum(),
  // .offset-[1-12]
  offset: strNum(),
  // Flex ordering utility .order-[1-12]
  order: strNum(),
  alignSelf: {
    type: String,
    default: null,
    validator: function validator(str) {
      return (0, _array.arrayIncludes)(['auto', 'start', 'end', 'center', 'baseline', 'stretch'], str);
    }
  }
  /**
   * We need ".col" to default in when no other props are passed,
   * but always render when col=true.
   */
  // @vue/component

});

exports.props = props;
var _default = {
  name: 'BCol',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _classList$push;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var classList = []; // Loop through `col`, `offset`, `order` breakpoint props

    for (var type in breakpointPropMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      var _keys = breakpointPropMap[type];

      for (var i = 0; i < _keys.length; i++) {
        // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
        var c = computeBkPtClass(type, _keys[i].replace(type, ''), props[_keys[i]]); // If a class is returned, push it onto the array.

        if (c) {
          classList.push(c);
        }
      }
    }

    classList.push((_classList$push = {
      // Default to .col if no other classes generated nor `cols` specified.
      col: props.col || classList.length === 0 && !props.cols
    }, _defineProperty(_classList$push, "col-".concat(props.cols), props.cols), _defineProperty(_classList$push, "offset-".concat(props.offset), props.offset), _defineProperty(_classList$push, "order-".concat(props.order), props.order), _defineProperty(_classList$push, "align-self-".concat(props.alignSelf), props.alignSelf), _classList$push));
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: classList
    }), children);
  }
};
exports.default = _default;