"use strict";

exports.__esModule = true;
exports.default = void 0;

var _id = require("../../mixins/id");

var _formState = require("../../mixins/form-state");

var _upperFirst = require("../../utils/upper-first");

var _memoize = require("../../utils/memoize");

var _warn = require("../../utils/warn");

var _dom = require("../../utils/dom");

var _array = require("../../utils/array");

var _object = require("../../utils/object");

var _formRow = require("../layout/form-row");

var _col = require("../layout/col");

var _formText = require("../form/form-text");

var _formInvalidFeedback = require("../form/form-invalid-feedback");

var _formValidFeedback = require("../form/form-valid-feedback");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Selector for finding first input in the form-group
var SELECTOR = 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled)'; // Breakpoint names for label-cols and label-align props

var BREAKPOINTS = ['', 'sm', 'md', 'lg', 'xl']; // Memoize this function to return cached values to save time in computed functions

var makePropName = (0, _memoize.default)(function () {
  var breakpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var prefix = arguments.length > 1 ? arguments[1] : undefined;
  return "".concat(prefix).concat((0, _upperFirst.default)(breakpoint));
}); // Generate the labelCol breakpoint props

var bpLabelColProps = BREAKPOINTS.reduce(function (props, breakpoint) {
  // label-cols, label-cols-sm, label-cols-md, ...
  props[makePropName(breakpoint, 'labelCols')] = {
    type: [Number, String, Boolean],
    default: breakpoint ? false : null
  };
  return props;
}, (0, _object.create)(null)); // Generate the labelAlign breakpoint props

var bpLabelAlignProps = BREAKPOINTS.reduce(function (props, breakpoint) {
  // label-align, label-align-sm, label-align-md, ...
  props[makePropName(breakpoint, 'labelAlign')] = {
    type: String,
    // left, right, center
    default: null
  };
  return props;
}, (0, _object.create)(null)); // render helper functions (here rather than polluting the instance with more methods)

function renderInvalidFeedback(h, ctx) {
  var content = ctx.$slots['invalid-feedback'] || ctx.invalidFeedback;
  var invalidFeedback = h(false);

  if (content) {
    invalidFeedback = h('b-form-invalid-feedback', {
      props: {
        id: ctx.invalidFeedbackId,
        // If state is explicitly false, always show the feedback
        state: ctx.computedState,
        tooltip: ctx.tooltip
      },
      attrs: {
        tabindex: content ? '-1' : null,
        role: 'alert',
        'aria-live': 'assertive',
        'aria-atomic': 'true'
      }
    }, [content]);
  }

  return invalidFeedback;
}

function renderValidFeedback(h, ctx) {
  var content = ctx.$slots['valid-feedback'] || ctx.validFeedback;
  var validFeedback = h(false);

  if (content) {
    validFeedback = h('b-form-valid-feedback', {
      props: {
        id: ctx.validFeedbackId,
        // If state is explicitly true, always show the feedback
        state: ctx.computedState,
        tooltip: ctx.tooltip
      },
      attrs: {
        tabindex: '-1',
        role: 'alert',
        'aria-live': 'assertive',
        'aria-atomic': 'true'
      }
    }, [content]);
  }

  return validFeedback;
}

function renderHelpText(h, ctx) {
  // Form help text (description)
  var content = ctx.$slots['description'] || ctx.description;
  var description = h(false);

  if (content) {
    description = h('b-form-text', {
      attrs: {
        id: ctx.descriptionId,
        tabindex: '-1'
      }
    }, [content]);
  }

  return description;
}

function renderLabel(h, ctx) {
  // render label/legend inside b-col if necessary
  var content = ctx.$slots['label'] || ctx.label;
  var labelFor = ctx.labelFor;
  var isLegend = !labelFor;
  var isHorizontal = ctx.isHorizontal;
  var labelTag = isLegend ? 'legend' : 'label';

  if (!content && !isHorizontal) {
    return h(false);
  } else if (ctx.labelSrOnly) {
    var label = h(false);

    if (content) {
      label = h(labelTag, {
        class: 'sr-only',
        attrs: {
          id: ctx.labelId,
          for: labelFor || null
        }
      }, [content]);
    }

    return h(isHorizontal ? 'b-col' : 'div', {
      props: isHorizontal ? ctx.labelColProps : {}
    }, [label]);
  } else {
    return h(isHorizontal ? 'b-col' : labelTag, {
      on: isLegend ? {
        click: ctx.legendClick
      } : {},
      props: isHorizontal ? _objectSpread({
        tag: labelTag
      }, ctx.labelColProps) : {},
      attrs: {
        id: ctx.labelId,
        for: labelFor || null,
        // We add a tab index to legend so that screen readers will properly read the aria-labelledby in IE.
        tabindex: isLegend ? '-1' : null
      },
      class: [// When horizontal or if a legend is rendered, add col-form-label for correct sizing
      // as Bootstrap has inconsitent font styling for legend in non-horiontal form-groups.
      // See: https://github.com/twbs/bootstrap/issues/27805
      isHorizontal || isLegend ? 'col-form-label' : '', // Emulate label padding top of 0 on legend when not horizontal
      !isHorizontal && isLegend ? 'pt-0' : '', // If not horizontal and not a legend, we add d-block to label so that label-align works
      !isHorizontal && !isLegend ? 'd-block' : '', ctx.labelSize ? "col-form-label-".concat(ctx.labelSize) : '', ctx.labelAlignClasses, ctx.labelClass]
    }, [content]);
  }
} // bFormGroup
// @vue/component


var _default = {
  name: 'BFormGroup',
  components: {
    BFormRow: _formRow.default,
    BCol: _col.default,
    BFormInvalidFeedback: _formInvalidFeedback.default,
    BFormValidFeedback: _formValidFeedback.default,
    BFormText: _formText.default
  },
  mixins: [_id.default, _formState.default],
  props: _objectSpread({
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    },
    labelSize: {
      type: String,
      default: null
    },
    labelSrOnly: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: [String, Array, Object],
      default: null
    },
    description: {
      type: String,
      default: null
    },
    invalidFeedback: {
      type: String,
      default: null
    },
    validFeedback: {
      type: String,
      default: null
    },
    tooltip: {
      // Enable tooltip style feedback
      type: Boolean,
      default: false
    },
    validated: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }, bpLabelColProps, bpLabelAlignProps, {
    horizontal: {
      // Deprecated
      type: Boolean,
      default: false
    },
    breakpoint: {
      // Deprecated (ignored if horizontal is not true)
      type: String,
      default: null // legacy value 'sm'

    }
  }),
  computed: {
    labelColProps: function labelColProps() {
      var _this = this;

      var props = {};

      if (this.horizontal) {
        // Deprecated setting of horizontal/breakpoint props
        (0, _warn.default)("b-form-group: Props 'horizontal' and 'breakpoint' are deprecated. Use 'label-cols(-{breakpoint})' props instead."); // Legacy default is breakpoint sm and cols 3

        var bp = this.breakpoint || 'sm';
        var cols = parseInt(this.labelCols, 10) || 3;
        props[bp] = cols > 0 ? cols : 3; // We then return the single breakpoint prop for legacy compatability

        return props;
      }

      BREAKPOINTS.forEach(function (breakpoint) {
        // Grab the value if the label column breakpoint prop
        var propVal = _this[makePropName(breakpoint, 'labelCols')]; // Handle case where the prop's value is an empty string, which represents true


        propVal = propVal === '' ? true : propVal || false;

        if (typeof propVal !== 'boolean') {
          // Convert to column size to number
          propVal = parseInt(propVal, 10) || 0; // Ensure column size is greater than 0

          propVal = propVal > 0 ? propVal : false;
        }

        if (propVal) {
          // Add the prop to the list of props to give to b-col.
          // if breakpoint is '' (labelCols=true), then we use the col prop to make equal width at xs
          var bColPropName = breakpoint || (typeof propVal === 'boolean' ? 'col' : 'cols'); // Add it to the props

          props[bColPropName] = propVal;
        }
      });
      return props;
    },
    labelAlignClasses: function labelAlignClasses() {
      var _this2 = this;

      var classes = [];
      BREAKPOINTS.forEach(function (breakpoint) {
        // assemble the label column breakpoint align classes
        var propVal = _this2[makePropName(breakpoint, 'labelAlign')] || null;

        if (propVal) {
          var className = breakpoint ? "text-".concat(breakpoint, "-").concat(propVal) : "text-".concat(propVal);
          classes.push(className);
        }
      });
      return classes;
    },
    isHorizontal: function isHorizontal() {
      // Determine if the resultant form-group will be rendered
      // horizontal (meaning it has label-col breakpoints)
      return (0, _object.keys)(this.labelColProps).length > 0;
    },
    labelId: function labelId() {
      return this.$slots['label'] || this.label ? this.safeId('_BV_label_') : null;
    },
    descriptionId: function descriptionId() {
      return this.$slots['description'] || this.description ? this.safeId('_BV_description_') : null;
    },
    hasInvalidFeedback: function hasInvalidFeedback() {
      // used for computing aria-describedby
      var $slots = this.$slots;
      return this.computedState === false && ($slots['invalid-feedback'] || this.invalidFeedback);
    },
    invalidFeedbackId: function invalidFeedbackId() {
      return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null;
    },
    hasValidFeedback: function hasValidFeedback() {
      // used for computing aria-describedby
      return this.computedState === true && (this.$slots['valid-feedback'] || this.validFeedback);
    },
    validFeedbackId: function validFeedbackId() {
      return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null;
    },
    describedByIds: function describedByIds() {
      // Screen readers will read out any content linked to by aria-describedby
      // even if the content is hidden with 'display: none', hence we only include
      // feedback IDs if the form-group's state is explicitly valid or invalid.
      return [this.descriptionId, this.invalidFeedbackId, this.validFeedbackId].filter(function (i) {
        return i;
      }).join(' ') || null;
    }
  },
  watch: {
    describedByIds: function describedByIds(add, remove) {
      if (add !== remove) {
        this.setInputDescribedBy(add, remove);
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      // Set the adia-describedby IDs on the input specified by label-for
      // We do this in a nextTick to ensure the children have finished rendering
      _this3.setInputDescribedBy(_this3.describedByIds);
    });
  },
  methods: {
    legendClick: function legendClick(evt) {
      if (this.labelFor) {
        // don't do anything if labelFor is set
        return;
      }

      var tagName = evt.target ? evt.target.tagName : '';

      if (/^(input|select|textarea|label|button|a)$/i.test(tagName)) {
        // If clicked an interactive element inside legend, we just let the default happen
        return;
      }

      var inputs = (0, _dom.selectAll)(SELECTOR, this.$refs.content).filter(_dom.isVisible);

      if (inputs && inputs.length === 1 && inputs[0].focus) {
        // if only a single input, focus it, emulating label behaviour
        inputs[0].focus();
      }
    },
    setInputDescribedBy: function setInputDescribedBy(add, remove) {
      // Sets the `aria-describedby` attribute on the input if label-for is set.
      // Optionally accepts a string of IDs to remove as the second parameter
      if (this.labelFor && typeof document !== 'undefined') {
        var input = (0, _dom.select)("#".concat(this.labelFor), this.$refs.content);

        if (input) {
          var adb = 'aria-describedby';
          var ids = ((0, _dom.getAttr)(input, adb) || '').split(/\s+/);
          remove = (remove || '').split(/\s+/); // Update ID list, preserving any original IDs

          ids = ids.filter(function (id) {
            return !(0, _array.arrayIncludes)(remove, id);
          }).concat(add || '').join(' ').trim();

          if (ids) {
            (0, _dom.setAttr)(input, adb, ids);
          } else {
            // No IDs, so remove the attribute
            (0, _dom.removeAttr)(input, adb);
          }
        }
      }
    }
  },
  render: function render(h) {
    var isFieldset = !this.labelFor;
    var isHorizontal = this.isHorizontal; // Generate the label

    var label = renderLabel(h, this); // Generate the content

    var content = h(isHorizontal ? 'b-col' : 'div', {
      ref: 'content',
      attrs: {
        tabindex: isFieldset ? '-1' : null,
        role: isFieldset ? 'group' : null,
        'aria-labelledby': isFieldset ? this.labelId : null,
        'aria-describedby': isFieldset ? this.ariaDescribedBy : null
      }
    }, [this.$slots['default'] || h(false), renderInvalidFeedback(h, this), renderValidFeedback(h, this), renderHelpText(h, this)]); // Create the form-group

    var data = {
      staticClass: 'form-group',
      class: [this.validated ? 'was-validated' : null, this.stateClass],
      attrs: {
        id: this.safeId(),
        disabled: isFieldset ? this.disabled : null,
        role: isFieldset ? null : 'group',
        'aria-invalid': this.computedState === false ? 'true' : null,
        'aria-labelledby': this.labelId || null,
        'aria-describedby': this.describedByIds || null
      } // Return it wrapped in a form-group.
      // Note: fieldsets do not support adding `row` or `form-row` directly to them
      // due to browser specific render issues, so we move the form-row to an
      // inner wrapper div when horizontal and using a fieldset

    };
    return h(isFieldset ? 'fieldset' : isHorizontal ? 'b-form-row' : 'div', data, isHorizontal && isFieldset ? [h('b-form-row', {}, [label, content])] : [label, content]);
  }
};
exports.default = _default;