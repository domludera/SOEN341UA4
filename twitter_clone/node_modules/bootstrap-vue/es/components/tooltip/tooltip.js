"use strict";

exports.__esModule = true;
exports.default = void 0;

var _tooltip = require("../../utils/tooltip.class");

var _warn = require("../../utils/warn");

var _toolpop = require("../../mixins/toolpop");

// @vue/component
var _default = {
  name: 'BTooltip',
  mixins: [_toolpop.default],
  props: {
    title: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    createToolpop: function createToolpop() {
      // getTarget is in toolpop mixin
      var target = this.getTarget();

      if (target) {
        this._toolpop = new _tooltip.default(target, this.getConfig(), this.$root);
      } else {
        this._toolpop = null;
        (0, _warn.default)("b-tooltip: 'target' element not found!");
      }

      return this._toolpop;
    }
  },
  render: function render(h) {
    return h('div', {
      class: ['d-none'],
      style: {
        display: 'none'
      },
      attrs: {
        'aria-hidden': true
      }
    }, [h('div', {
      ref: 'title'
    }, this.$slots.default)]);
  }
};
exports.default = _default;