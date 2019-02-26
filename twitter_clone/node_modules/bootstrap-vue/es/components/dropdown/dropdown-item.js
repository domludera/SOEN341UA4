"use strict";

exports.__esModule = true;
exports.default = exports.props = void 0;

var _link = require("../link/link");

var props = (0, _link.propsFactory)(); // @vue/component

exports.props = props;
var _default = {
  name: 'BDropdownItem',
  inject: {
    dropdown: {
      from: 'dropdown',
      default: null
    }
  },
  props: props,
  methods: {
    closeDropdown: function closeDropdown() {
      if (this.dropdown) {
        this.dropdown.hide(true);
      }
    },
    onClick: function onClick(evt) {
      this.$emit('click', evt);
      this.closeDropdown();
    }
  },
  render: function render(h) {
    return h(_link.default, {
      props: this.$props,
      staticClass: 'dropdown-item',
      attrs: {
        role: 'menuitem'
      },
      on: {
        click: this.onClick
      }
    }, this.$slots.default);
  }
};
exports.default = _default;