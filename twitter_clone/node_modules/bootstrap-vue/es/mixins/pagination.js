"use strict";

exports.__esModule = true;
exports.default = void 0;

var _warn = require("../utils/warn");

var _range = require("../utils/range");

var _keyCodes = require("../utils/key-codes");

var _dom = require("../utils/dom");

var _html = require("../utils/html");

var _link = require("../components/link/link");

/*
 * Comon props, computed, data, render function, and methods for b-pagination and b-pagination-nav
 */
// Threshold of limit size when we start/stop showing ellipsis
var ELLIPSIS_THRESHOLD = 3; // Default # of buttons limit

var DEFAULT_LIMIT = 5; // Make an array of N to N+X

function makePageArray(startNum, numPages) {
  return (0, _range.default)(numPages).map(function (value, index) {
    return {
      number: index + startNum,
      classes: null
    };
  });
} // Sanitize the provided Limit value (converting to a number)


function sanitizeLimit(value) {
  var limit = parseInt(value, 10) || 1;
  return limit < 1 ? DEFAULT_LIMIT : limit;
} // Sanitize the provided numberOfPages value (converting to a number)


function sanitizeNumPages(value) {
  var num = parseInt(value, 10) || 1;
  return num < 1 ? 1 : num;
} // Sanitize the provided current page number (converting to a number)


function sanitizeCurPage(value, numPages) {
  var page = parseInt(value, 10) || 1;
  return page > numPages ? numPages : page < 1 ? 1 : page;
} // Links don't normally respond to SPACE, so we add that functionality via this handler


function onSpaceKey(evt) {
  if (evt.keyCode === _keyCodes.default.SPACE) {
    evt.preventDefault(); // Stop page from scrolling

    evt.stopImmediatePropagation();
    evt.stopPropagation(); // Trigger the click event on the link

    evt.currentTarget.click();
    return false;
  }
} // Props object


var props = {
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String],
    default: 1,
    validator: function validator(value) {
      var num = parseInt(value, 10);
      /* istanbul ignore if */

      if (isNaN(num) || num < 1) {
        (0, _warn.default)('pagination: v-model value must be a number greater than 0');
        return false;
      }

      return true;
    }
  },
  limit: {
    type: [Number, String],
    default: DEFAULT_LIMIT,
    validator: function validator(value) {
      var num = parseInt(value, 10);
      /* istanbul ignore if */

      if (isNaN(num) || num < 1) {
        (0, _warn.default)('pagination: prop "limit" must be a number greater than 0');
        return false;
      }

      return true;
    }
  },
  size: {
    type: String,
    default: 'md'
  },
  align: {
    type: String,
    default: 'left'
  },
  hideGotoEndButtons: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Pagination'
  },
  labelFirstPage: {
    type: String,
    default: 'Go to first page'
  },
  firstText: {
    type: String,
    default: '«'
  },
  labelPrevPage: {
    type: String,
    default: 'Go to previous page'
  },
  prevText: {
    type: String,
    default: '‹'
  },
  labelNextPage: {
    type: String,
    default: 'Go to next page'
  },
  nextText: {
    type: String,
    default: '›'
  },
  labelLastPage: {
    type: String,
    default: 'Go to last page'
  },
  lastText: {
    type: String,
    default: '»'
  },
  labelPage: {
    type: String,
    default: 'Go to page'
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  ellipsisText: {
    type: String,
    default: '…'
  } // @vue/component

};
var _default = {
  components: {
    BLink: _link.default
  },
  props: props,
  data: function data() {
    return {
      currentPage: 1,
      localNumPages: 1,
      localLimit: DEFAULT_LIMIT
    };
  },
  computed: {
    btnSize: function btnSize() {
      return this.size ? "pagination-".concat(this.size) : '';
    },
    alignment: function alignment() {
      if (this.align === 'center') {
        return 'justify-content-center';
      } else if (this.align === 'end' || this.align === 'right') {
        return 'justify-content-end';
      }

      return '';
    },
    paginationParams: function paginationParams() {
      // Determine if we should show the the ellipsis
      var limit = this.limit;
      var numPages = this.localNumPages;
      var curPage = this.currentPage;
      var hideEllipsis = this.hideEllipsis;
      var showFirstDots = false;
      var showLastDots = false;
      var numLinks = limit;
      var startNum = 1;

      if (numPages <= limit) {
        // Special Case: Less pages available than the limit of displayed pages
        numLinks = numPages;
      } else if (curPage < limit - 1 && limit > ELLIPSIS_THRESHOLD) {
        // We are near the beginning of the page list
        if (!hideEllipsis) {
          showLastDots = true;
          numLinks = limit - 1;
        }
      } else if (numPages - curPage + 2 < limit && limit > ELLIPSIS_THRESHOLD) {
        // We are near the end of the list
        if (!hideEllipsis) {
          numLinks = limit - 1;
          showFirstDots = true;
        }

        startNum = numPages - numLinks + 1;
      } else {
        // We are somewhere in the middle of the page list
        if (limit > ELLIPSIS_THRESHOLD && !hideEllipsis) {
          numLinks = limit - 2;
          showFirstDots = showLastDots = true;
        }

        startNum = curPage - Math.floor(numLinks / 2);
      } // Sanity checks


      if (startNum < 1) {
        startNum = 1;
      } else if (startNum > numPages - numLinks) {
        startNum = numPages - numLinks + 1;
      }

      return {
        showFirstDots: showFirstDots,
        showLastDots: showLastDots,
        numLinks: numLinks,
        startNum: startNum
      };
    },
    pageList: function pageList() {
      // Generates the pageList array
      var _this$paginationParam = this.paginationParams,
          numLinks = _this$paginationParam.numLinks,
          startNum = _this$paginationParam.startNum; // Generate list of page numbers

      var pages = makePageArray(startNum, numLinks); // We limit to a total of 3 page buttons on XS screens
      // So add classes to page links to hide them for XS breakpoint
      // Note: Ellipsis will also be hidden on XS screens
      // TODO: Make this visual limit configurable based on breakpoint(s)

      if (pages.length > 3) {
        var idx = this.currentPage - startNum;

        if (idx === 0) {
          // Keep leftmost 3 buttons visible when current page is first page
          for (var i = 3; i < pages.length; i++) {
            pages[i].classes = 'd-none d-sm-flex';
          }
        } else if (idx === pages.length - 1) {
          // Keep rightmost 3 buttons visible when current page is last page
          for (var _i = 0; _i < pages.length - 3; _i++) {
            pages[_i].classes = 'd-none d-sm-flex';
          }
        } else {
          // Hide all except current page, current page - 1 and current page + 1
          for (var _i2 = 0; _i2 < idx - 1; _i2++) {
            // hide some left button(s)
            pages[_i2].classes = 'd-none d-sm-flex';
          }

          for (var _i3 = pages.length - 1; _i3 > idx + 1; _i3--) {
            // hide some right button(s)
            pages[_i3].classes = 'd-none d-sm-flex';
          }
        }
      }

      return pages;
    }
  },
  watch: {
    value: function value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentPage = sanitizeCurPage(newValue, this.localNumPages);
      }
    },
    currentPage: function currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('input', newValue);
      }
    },
    numberOfPages: function numberOfPages(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localNumPages = sanitizeNumPages(newValue);
      }
    },
    limit: function limit(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localLimit = sanitizeLimit(newValue);
      }
    }
  },
  created: function created() {
    // Set our default values in data
    this.localLimit = sanitizeLimit(this.limit);
    this.localNumPages = sanitizeNumPages(this.numberOfPages);
    this.currentPage = sanitizeCurPage(this.value, this.localNumPages);
  },
  methods: {
    getButtons: function getButtons() {
      // Return only buttons that are visible
      return (0, _dom.selectAll)('a.page-link', this.$el).filter(function (btn) {
        return (0, _dom.isVisible)(btn);
      });
    },
    setBtnFocus: function setBtnFocus(btn) {
      btn.focus();
    },
    focusCurrent: function focusCurrent() {
      var _this = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var btn = _this.getButtons().find(function (el) {
          return parseInt((0, _dom.getAttr)(el, 'aria-posinset'), 10) === _this.currentPage;
        });

        if (btn && btn.focus) {
          _this.setBtnFocus(btn);
        } else {
          // Fallback if current page is not in button list
          _this.focusFirst();
        }
      });
    },
    focusFirst: function focusFirst() {
      var _this2 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var btn = _this2.getButtons().find(function (el) {
          return !(0, _dom.isDisabled)(el);
        });

        if (btn && btn.focus && btn !== document.activeElement) {
          _this2.setBtnFocus(btn);
        }
      });
    },
    focusLast: function focusLast() {
      var _this3 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var btn = _this3.getButtons().reverse().find(function (el) {
          return !(0, _dom.isDisabled)(el);
        });

        if (btn && btn.focus && btn !== document.activeElement) {
          _this3.setBtnFocus(btn);
        }
      });
    },
    focusPrev: function focusPrev() {
      var _this4 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var buttons = _this4.getButtons();

        var idx = buttons.indexOf(document.activeElement);

        if (idx > 0 && !(0, _dom.isDisabled)(buttons[idx - 1]) && buttons[idx - 1].focus) {
          _this4.setBtnFocus(buttons[idx - 1]);
        }
      });
    },
    focusNext: function focusNext() {
      var _this5 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var buttons = _this5.getButtons();

        var idx = buttons.indexOf(document.activeElement);
        var cnt = buttons.length - 1;

        if (idx < cnt && !(0, _dom.isDisabled)(buttons[idx + 1]) && buttons[idx + 1].focus) {
          _this5.setBtnFocus(buttons[idx + 1]);
        }
      });
    }
  },
  render: function render(h) {
    var _this6 = this;

    var buttons = [];
    var numberOfPages = this.localNumPages;
    var disabled = this.disabled;
    var _this$paginationParam2 = this.paginationParams,
        showFirstDots = _this$paginationParam2.showFirstDots,
        showLastDots = _this$paginationParam2.showLastDots; // Helper function

    var isActivePage = function isActivePage(pageNum) {
      return pageNum === _this6.currentPage;
    }; // Factory function for prev/next/first/last buttons


    var makeEndBtn = function makeEndBtn(linkTo, ariaLabel, btnSlot, btnText, pageTest, key) {
      var button;
      var domProps = btnSlot ? {} : {
        textContent: btnText
      };
      var staticClass = 'page-item';
      var attrs = {
        role: 'none presentation',
        'aria-hidden': disabled ? 'true' : null
      };

      if (disabled || isActivePage(pageTest) || linkTo < 1 || linkTo > numberOfPages) {
        button = h('li', {
          key: key,
          attrs: attrs,
          staticClass: staticClass,
          class: ['disabled']
        }, [h('span', {
          staticClass: 'page-link',
          domProps: domProps
        }, [btnSlot])]);
      } else {
        button = h('li', {
          key: key,
          attrs: attrs,
          staticClass: staticClass
        }, [h('b-link', {
          staticClass: 'page-link',
          props: _this6.linkProps(linkTo),
          attrs: {
            role: 'menuitem',
            tabindex: '-1',
            'aria-label': ariaLabel,
            'aria-controls': _this6.ariaControls || null
          },
          on: {
            click: function click(evt) {
              _this6.onClick(linkTo, evt);
            },
            keydown: onSpaceKey
          }
        }, [h('span', {
          domProps: domProps
        }, [btnSlot])])]);
      }

      return button;
    }; // Ellipsis factory


    var makeEllipsis = function makeEllipsis(isLast) {
      return h('li', {
        key: "elipsis-".concat(isLast ? 'last' : 'first'),
        class: ['page-item', 'disabled', 'd-none', 'd-sm-flex'],
        attrs: {
          role: 'separator'
        }
      }, [_this6.$slots['ellipsis-text'] || h('span', {
        class: ['page-link'],
        domProps: {
          textContent: _this6.ellipsisText
        }
      })]);
    }; // Goto First Page button bookend


    buttons.push(this.hideGotoEndButtons ? h(false) : makeEndBtn(1, this.labelFirstPage, this.$slots['first-text'], (0, _html.stripTags)(this.firstText), 1, 'bookend-goto-first')); // Goto Previous page button bookend

    buttons.push(makeEndBtn(this.currentPage - 1, this.labelPrevPage, this.$slots['prev-text'], (0, _html.stripTags)(this.prevText), 1, 'bookend-goto-prev')); // First Ellipsis Bookend

    buttons.push(showFirstDots ? makeEllipsis(false) : h(false)); // Individual Page links

    this.pageList.forEach(function (page) {
      var inner;

      var pageText = _this6.makePage(page.number);

      var active = isActivePage(page.number);
      var staticClass = 'page-link';
      var attrs = {
        role: 'menuitemradio',
        'aria-disabled': disabled ? 'true' : null,
        'aria-controls': _this6.ariaControls || null,
        'aria-label': "".concat(_this6.labelPage, " ").concat(page.number),
        'aria-checked': active ? 'true' : 'false',
        'aria-posinset': page.number,
        'aria-setsize': numberOfPages,
        // ARIA "roving tabindex" method
        tabindex: disabled ? null : active ? '0' : '-1'
      };

      if (disabled) {
        inner = h('span', {
          key: "page-".concat(page.number, "-link-disabled"),
          staticClass: staticClass,
          attrs: attrs
        }, pageText);
      } else {
        inner = h('b-link', {
          key: "page-".concat(page.number, "-link"),
          props: _this6.linkProps(page.number),
          staticClass: staticClass,
          attrs: attrs,
          on: {
            click: function click(evt) {
              _this6.onClick(page.number, evt);
            },
            keydown: onSpaceKey
          }
        }, pageText);
      }

      buttons.push(h('li', {
        key: "page-".concat(page.number),
        staticClass: 'page-item',
        class: [disabled ? 'disabled' : '', active ? 'active' : '', page.classes],
        attrs: {
          role: 'none presentation'
        }
      }, [inner]));
    }); // Last Ellipsis Bookend

    buttons.push(showLastDots ? makeEllipsis(true) : h(false)); // Goto Next page button bookend

    buttons.push(makeEndBtn(this.currentPage + 1, this.labelNextPage, this.$slots['next-text'], this.nextText, numberOfPages, 'bookend-goto-next')); // Goto Last Page button bookend

    buttons.push(this.hideGotoEndButtons ? h(false) : makeEndBtn(numberOfPages, this.labelLastPage, this.$slots['last-text'], this.lastText, numberOfPages, 'bookend-goto-last')); // Assemble the paginatiom buttons

    var pagination = h('ul', {
      ref: 'ul',
      class: ['pagination', 'b-pagination', this.btnSize, this.alignment],
      attrs: {
        role: 'menubar',
        'aria-disabled': disabled ? 'true' : 'false',
        'aria-label': this.ariaLabel || null
      },
      on: {
        keydown: function keydown(evt) {
          var keyCode = evt.keyCode;
          var shift = evt.shiftKey;

          if (keyCode === _keyCodes.default.LEFT) {
            evt.preventDefault();
            shift ? _this6.focusFirst() : _this6.focusPrev();
          } else if (keyCode === _keyCodes.default.RIGHT) {
            evt.preventDefault();
            shift ? _this6.focusLast() : _this6.focusNext();
          }
        }
      }
    }, buttons); // if we are pagination-nav, wrap in '<nav>' wrapper

    if (this.isNav) {
      return h('nav', {
        attrs: {
          'aria-disabled': disabled ? 'true' : null,
          'aria-hidden': disabled ? 'true' : 'false'
        }
      }, [pagination]);
    } else {
      return pagination;
    }
  }
};
exports.default = _default;