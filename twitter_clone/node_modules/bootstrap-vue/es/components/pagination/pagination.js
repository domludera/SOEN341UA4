"use strict";

exports.__esModule = true;
exports.default = void 0;

var _pagination = require("../../mixins/pagination");

var _dom = require("../../utils/dom");

var DEFAULT_PER_PAGE = 20;
var DEFAULT_TOTAL_ROWS = 0;

function sanitizePerPage(value) {
  var perPage = parseInt(value, 10) || DEFAULT_PER_PAGE;
  return perPage < 1 ? 1 : perPage;
}

function sanitizeTotalRows(value) {
  var totalRows = parseInt(value, 10) || DEFAULT_TOTAL_ROWS;
  return totalRows < 0 ? 0 : totalRows;
}

var props = {
  perPage: {
    type: [Number, String],
    default: DEFAULT_PER_PAGE
  },
  totalRows: {
    type: [Number, String],
    default: DEFAULT_TOTAL_ROWS
  },
  ariaControls: {
    type: String,
    default: null
  } // Our render function is brought in from the pagination mixin
  // @vue/component

};
var _default = {
  name: 'BPagination',
  mixins: [_pagination.default],
  props: props,
  computed: {
    numberOfPages: function numberOfPages() {
      var result = Math.ceil(sanitizeTotalRows(this.totalRows) / sanitizePerPage(this.perPage));
      return result < 1 ? 1 : result;
    }
  },
  methods: {
    // These methods are used by the render function
    onClick: function onClick(num, evt) {
      var _this = this;

      // Handle edge cases where number of pages has changed (i.e. if perPage changes)
      if (num > this.numberOfPages) {
        num = this.numberOfPages;
      } else if (num < 1) {
        num = 1;
      } // Update the v-model


      this.currentPage = num; // Emit event triggered by user interaction

      this.$emit('change', this.currentPage);
      this.$nextTick(function () {
        // Keep the current button focused if possible
        var target = evt.target;

        if ((0, _dom.isVisible)(target) && _this.$el.contains(target) && target.focus) {
          target.focus();
        } else {
          _this.focusCurrent();
        }
      });
    },
    makePage: function makePage(pagenum) {
      return pagenum;
    },
    linkProps: function linkProps(pagenum) {
      // Always '#' for pagination component
      return {
        href: '#'
      };
    }
  }
};
exports.default = _default;