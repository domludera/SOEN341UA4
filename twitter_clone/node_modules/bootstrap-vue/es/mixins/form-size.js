"use strict";

exports.__esModule = true;
exports.default = void 0;
// @vue/component
var _default = {
  props: {
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    sizeFormClass: function sizeFormClass() {
      return [this.size ? "form-control-".concat(this.size) : null];
    },
    sizeBtnClass: function sizeBtnClass() {
      return [this.size ? "btn-".concat(this.size) : null];
    }
  }
};
exports.default = _default;