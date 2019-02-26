"use strict";

exports.__esModule = true;
exports.default = void 0;

var _id = require("../../mixins/id");

var _form = require("../../mixins/form");

var _formOptions = require("../../mixins/form-options");

var _formRadioCheckGroup = require("../../mixins/form-radio-check-group");

var _formSize = require("../../mixins/form-size");

var _formState = require("../../mixins/form-state");

var _formRadio = require("./form-radio");

// @vue/component
var _default = {
  name: 'BFormRadioGroup',
  components: {
    BFormRadio: _formRadio.default
  },
  mixins: [_id.default, _form.default, _formRadioCheckGroup.default, // includes render function
  _formOptions.default, _formSize.default, _formState.default],
  provide: function provide() {
    return {
      bvRadioGroup: this
    };
  },
  props: {
    checked: {
      type: [String, Object, Number, Boolean],
      default: null
    }
  },
  data: function data() {
    return {
      localChecked: this.checked
    };
  },
  computed: {
    is_RadioGroup: function is_RadioGroup() {
      return true;
    }
  }
};
exports.default = _default;