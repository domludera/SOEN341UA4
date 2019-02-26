"use strict";

exports.__esModule = true;
exports.default = void 0;
// @vue/component
var _default = {
  computed: {
    /* istanbul ignore next */
    validity: {
      // Expose validity property
      cache: false,
      get: function get() {
        return this.$refs.input.validity;
      }
    },

    /* istanbul ignore next */
    validationMessage: {
      // Expose validationMessage property
      cache: false,
      get: function get() {
        return this.$refs.input.validationMessage;
      }
    },

    /* istanbul ignore next */
    willValidate: {
      // Expose willValidate property
      cache: false,
      get: function get() {
        return this.$refs.input.willValidate;
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    setCustomValidity: function setCustomValidity() {
      var _this$$refs$input;

      // For external handler that may want a setCustomValidity(...) method
      return (_this$$refs$input = this.$refs.input).setCustomValidity.apply(_this$$refs$input, arguments);
    },

    /* istanbul ignore next */
    checkValidity: function checkValidity() {
      var _this$$refs$input2;

      // For external handler that may want a checkValidity(...) method
      return (_this$$refs$input2 = this.$refs.input).checkValidity.apply(_this$$refs$input2, arguments);
    },

    /* istanbul ignore next */
    reportValidity: function reportValidity() {
      var _this$$refs$input3;

      // For external handler that may want a reportValidity(...) method
      return (_this$$refs$input3 = this.$refs.input).reportValidity.apply(_this$$refs$input3, arguments);
    }
  }
};
exports.default = _default;