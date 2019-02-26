"use strict";

exports.__esModule = true;
exports.default = void 0;

var _id = require("../../mixins/id");

var _dropdown = require("../../mixins/dropdown");

var _html = require("../../utils/html");

// @vue/component
var _default = {
  name: 'BNavItemDropdown',
  mixins: [_id.default, _dropdown.default],
  props: {
    noCaret: {
      type: Boolean,
      default: false
    },
    extraToggleClasses: {
      // Extra Toggle classes
      type: String,
      default: ''
    },
    extraMenuClasses: {
      // Extra Menu classes
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'menu'
    }
  },
  computed: {
    isNav: function isNav() {
      // Signal to dropdown mixin that we are in a navbar
      return true;
    },
    dropdownClasses: function dropdownClasses() {
      return ['nav-item', 'b-nav-dropdown', 'dropdown', this.dropup ? 'dropup' : '', this.visible ? 'show' : ''];
    },
    toggleClasses: function toggleClasses() {
      return ['nav-link', this.noCaret ? '' : 'dropdown-toggle', this.disabled ? 'disabled' : '', this.extraToggleClasses ? this.extraToggleClasses : ''];
    },
    menuClasses: function menuClasses() {
      return ['dropdown-menu', this.right ? 'dropdown-menu-right' : 'dropdown-menu-left', this.visible ? 'show' : '', this.extraMenuClasses ? this.extraMenuClasses : ''];
    }
  },
  render: function render(h) {
    var button = h('a', {
      class: this.toggleClasses,
      ref: 'toggle',
      attrs: {
        href: '#',
        id: this.safeId('_BV_button_'),
        disabled: this.disabled,
        'aria-haspopup': 'true',
        'aria-expanded': this.visible ? 'true' : 'false'
      },
      on: {
        click: this.toggle,
        keydown: this.toggle // space, enter, down

      }
    }, [this.$slots['button-content'] || this.$slots.text || h('span', {
      domProps: (0, _html.htmlOrText)(this.html, this.text)
    })]);
    var menu = h('div', {
      class: this.menuClasses,
      ref: 'menu',
      attrs: {
        tabindex: '-1',
        'aria-labelledby': this.safeId('_BV_button_')
      },
      on: {
        mouseover: this.onMouseOver,
        keydown: this.onKeydown // tab, up, down, esc

      }
    }, [this.$slots.default]);
    return h('li', {
      attrs: {
        id: this.safeId()
      },
      class: this.dropdownClasses
    }, [button, menu]);
  }
};
exports.default = _default;