"use strict";

exports.__esModule = true;
exports.default = void 0;
// @vue/component
var _default = {
  computed: {
    /* istanbul ignore next */
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,
      get: function get() {
        return this.$refs.input.selectionStart;
      },
      set: function set(val) {
        this.$refs.input.selectionStart = val;
      }
    },

    /* istanbul ignore next */
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,
      get: function get() {
        return this.$refs.input.selectionEnd;
      },
      set: function set(val) {
        this.$refs.input.selectionEnd = val;
      }
    },

    /* istanbul ignore next */
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,
      get: function get() {
        return this.$refs.input.selectionDirection;
      },
      set: function set(val) {
        this.$refs.input.selectionDirection = val;
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    select: function select() {
      var _this$$refs$input;

      // For external handler that may want a select() method
      (_this$$refs$input = this.$refs.input).select.apply(_this$$refs$input, arguments);
    },

    /* istanbul ignore next */
    setSelectionRange: function setSelectionRange() {
      var _this$$refs$input2;

      // For external handler that may want a setSelectionRange(a,b,c) method
      (_this$$refs$input2 = this.$refs.input).setSelectionRange.apply(_this$$refs$input2, arguments);
    },

    /* istanbul ignore next */
    setRangeText: function setRangeText() {
      var _this$$refs$input3;

      // For external handler that may want a setRangeText(a,b,c) method
      (_this$$refs$input3 = this.$refs.input).setRangeText.apply(_this$$refs$input3, arguments);
    }
  }
};
exports.default = _default;