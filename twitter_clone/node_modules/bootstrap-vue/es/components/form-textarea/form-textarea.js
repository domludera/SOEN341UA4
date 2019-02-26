"use strict";

exports.__esModule = true;
exports.default = void 0;

var _id = require("../../mixins/id");

var _form = require("../../mixins/form");

var _formSize = require("../../mixins/form-size");

var _formState = require("../../mixins/form-state");

var _formText = require("../../mixins/form-text");

var _formSelection = require("../../mixins/form-selection");

var _formValidity = require("../../mixins/form-validity");

var _dom = require("../../utils/dom");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @vue/component
var _default = {
  name: 'BFormTextarea',
  mixins: [_id.default, _form.default, _formSize.default, _formState.default, _formText.default, _formSelection.default, _formValidity.default],
  props: {
    rows: {
      type: [Number, String],
      default: 2
    },
    maxRows: {
      type: [Number, String],
      default: null
    },
    wrap: {
      // 'soft', 'hard' or 'off'. Browser default is 'soft'
      type: String,
      default: 'soft'
    },
    noResize: {
      // Disable the resize handle of textarea
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      dontResize: true
    };
  },
  computed: {
    computedStyle: function computedStyle() {
      return {
        // setting noResize to true will disable the ability for the user to
        // resize the textarea. We also disable when in auto resize mode
        resize: !this.computedRows || this.noResize ? 'none' : null,
        // The computed height for auto resize
        height: this.computedHeight
      };
    },
    computedMinRows: function computedMinRows() {
      // Ensure rows is at least 2 and positive (2 is the native textarea value)
      return Math.max(parseInt(this.rows, 10) || 2, 2);
    },
    computedMaxRows: function computedMaxRows() {
      return Math.max(this.computedMinRows, parseInt(this.maxRows, 10) || 0);
    },
    computedRows: function computedRows() {
      return this.computedMinRows === this.computedMaxRows ? this.computedMinRows : null;
    },
    computedHeight: function computedHeight()
    /* istanbul ignore next: can't test getComputedProperties */
    {
      var el = this.$el;

      if (this.isServer) {
        return null;
      } // We compare this.localValue to null to ensure reactivity of content changes.


      if (this.localValue === null || this.computedRows || this.dontResize || this.$isServer) {
        return null;
      } // Element must be visible (not hidden) and in document. *Must* be checked after above.


      if (!(0, _dom.isVisible)(el)) {
        return null;
      } // Remember old height and reset it temporarily


      var oldHeight = el.style.height;
      el.style.height = 'auto'; // Get current computed styles

      var computedStyle = (0, _dom.getCS)(el); // Height of one line of text in px

      var lineHeight = parseFloat(computedStyle.lineHeight); // Minimum height for min rows (browser dependant)

      var minHeight = parseInt(computedStyle.height, 10) || lineHeight * this.computedMinRows; // Calculate height of content

      var offset = (parseFloat(computedStyle.borderTopWidth) || 0) + (parseFloat(computedStyle.borderBottomWidth) || 0) + (parseFloat(computedStyle.paddingTop) || 0) + (parseFloat(computedStyle.paddingBottom) || 0); // Calculate content height in "rows"

      var contentRows = (el.scrollHeight - offset) / lineHeight; // Put the old height back (needed when new height is equal to old height!)

      el.style.height = oldHeight; // Calculate number of rows to display (limited within min/max rows)

      var rows = Math.min(Math.max(contentRows, this.computedMinRows), this.computedMaxRows); // Calulate the required height of the textarea including border and padding (in pixels)

      var height = Math.max(Math.ceil(rows * lineHeight + offset), minHeight); // return the new computed height in px units

      return "".concat(height, "px");
    }
  },
  mounted: function mounted() {
    var _this = this;

    // Enable opt-in resizing once mounted
    this.$nextTick(function () {
      _this.dontResize = false;
    });
  },
  activated: function activated() {
    var _this2 = this;

    // If we are being re-activated in <keep-alive>, enable opt-in resizing
    this.$nextTick(function () {
      _this2.dontResize = false;
    });
  },
  deactivated: function deactivated() {
    // If we are in a deactivated <keep-alive>, disable opt-in resizing
    this.dontResize = true;
  },
  beforeDestroy: function beforeDestroy() {
    /* istanbul ignore next */
    this.dontResize = true;
  },
  render: function render(h) {
    // Using self instead of this helps reduce code size during minification
    var self = this;
    return h('textarea', {
      ref: 'input',
      class: self.computedClass,
      style: self.computedStyle,
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: self.localValue,
        expression: 'localValue'
      }],
      attrs: {
        id: self.safeId(),
        name: self.name,
        form: self.form || null,
        disabled: self.disabled,
        placeholder: self.placeholder,
        required: self.required,
        autocomplete: self.autocomplete || null,
        readonly: self.readonly || self.plaintext,
        rows: self.computedRows,
        wrap: self.wrap || null,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: {
        value: self.localValue
      },
      on: _objectSpread({}, self.$listeners, {
        input: self.onInput,
        change: self.onChange,
        blur: self.onBlur
      })
    });
  }
};
exports.default = _default;