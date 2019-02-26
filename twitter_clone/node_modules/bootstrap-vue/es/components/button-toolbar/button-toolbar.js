"use strict";

exports.__esModule = true;
exports.default = void 0;

var _dom = require("../../utils/dom");

var _keyCodes = require("../../utils/key-codes");

var ITEM_SELECTOR = ['.btn:not(.disabled):not([disabled]):not(.dropdown-item)', '.form-control:not(.disabled):not([disabled])', 'select:not(.disabled):not([disabled])', 'input[type="checkbox"]:not(.disabled)', 'input[type="radio"]:not(.disabled)'].join(','); // @vue/component

var _default = {
  name: 'BButtonToolbar',
  props: {
    justify: {
      type: Boolean,
      default: false
    },
    keyNav: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObject: function classObject() {
      return ['btn-toolbar', this.justify && !this.vertical ? 'justify-content-between' : ''];
    }
  },
  mounted: function mounted() {
    if (this.keyNav) {
      // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
      this.getItems();
    }
  },
  methods: {
    onFocusin: function onFocusin(evt) {
      if (evt.target === this.$el) {
        evt.preventDefault();
        evt.stopPropagation();
        this.focusFirst(evt);
      }
    },
    onKeydown: function onKeydown(evt) {
      if (!this.keyNav) {
        return;
      }

      var key = evt.keyCode;
      var shift = evt.shiftKey;

      if (key === _keyCodes.default.UP || key === _keyCodes.default.LEFT) {
        evt.preventDefault();
        evt.stopPropagation();

        if (shift) {
          this.focusFirst(evt);
        } else {
          this.focusNext(evt, true);
        }
      } else if (key === _keyCodes.default.DOWN || key === _keyCodes.default.RIGHT) {
        evt.preventDefault();
        evt.stopPropagation();

        if (shift) {
          this.focusLast(evt);
        } else {
          this.focusNext(evt, false);
        }
      }
    },
    setItemFocus: function setItemFocus(item) {
      this.$nextTick(function () {
        item.focus();
      });
    },
    focusNext: function focusNext(evt, prev) {
      var items = this.getItems();

      if (items.length < 1) {
        return;
      }

      var index = items.indexOf(evt.target);

      if (prev && index > 0) {
        index--;
      } else if (!prev && index < items.length - 1) {
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      this.setItemFocus(items[index]);
    },
    focusFirst: function focusFirst(evt) {
      var items = this.getItems();

      if (items.length > 0) {
        this.setItemFocus(items[0]);
      }
    },
    focusLast: function focusLast(evt) {
      var items = this.getItems();

      if (items.length > 0) {
        this.setItemFocus([items.length - 1]);
      }
    },
    getItems: function getItems() {
      var items = (0, _dom.selectAll)(ITEM_SELECTOR, this.$el);
      items.forEach(function (item) {
        // Ensure tabfocus is -1 on any new elements
        item.tabIndex = -1;
      });
      return items.filter(function (el) {
        return (0, _dom.isVisible)(el);
      });
    }
  },
  render: function render(h) {
    return h('div', {
      class: this.classObject,
      attrs: {
        role: 'toolbar',
        tabindex: this.keyNav ? '0' : null
      },
      on: {
        focusin: this.onFocusin,
        keydown: this.onKeydown
      }
    }, [this.$slots.default]);
  }
};
exports.default = _default;