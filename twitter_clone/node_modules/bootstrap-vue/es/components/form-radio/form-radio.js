"use strict";

exports.__esModule = true;
exports.default = void 0;

var _id = require("../../mixins/id");

var _form = require("../../mixins/form");

var _formState = require("../../mixins/form-state");

var _formSize = require("../../mixins/form-size");

var _formRadioCheck = require("../../mixins/form-radio-check");

var _looseEqual = require("../../utils/loose-equal");

// @vue/component
var _default2 = {
  name: 'BFormRadio',
  mixins: [_id.default, _formRadioCheck.default, // includes shared render function
  _form.default, _formSize.default, _formState.default],
  inject: {
    bvGroup: {
      from: 'bvRadioGroup',
      default: function _default() {
        return this;
      }
    }
  },
  props: {
    checked: {
      // v-model
      type: [String, Object, Number, Boolean],
      default: null
    }
  },
  computed: {
    // Radio Groups can only have a single value, so determining if checked is simple
    is_Checked: function is_Checked() {
      return (0, _looseEqual.default)(this.value, this.computedLocalChecked);
    },
    is_Radio: function is_Radio() {
      return true;
    },
    is_Check: function is_Check() {
      return false;
    }
  },
  watch: {
    // Radio Groups can only have a single value, so our watchers are simple
    computedLocalChecked: function computedLocalChecked(newVal, oldVal) {
      this.$emit('input', this.computedLocalChecked);
    }
  },
  methods: {
    handleChange: function handleChange(_ref) {
      var checked = _ref.target.checked;
      var value = this.value;
      this.computedLocalChecked = value; // Change is only emitted on user interaction

      this.$emit('change', checked ? value : null); // If this is a child of form-radio-group, we emit a change event on it as well

      if (this.is_Group) {
        this.bvGroup.$emit('change', checked ? value : null);
      }
    }
  }
};
exports.default = _default2;