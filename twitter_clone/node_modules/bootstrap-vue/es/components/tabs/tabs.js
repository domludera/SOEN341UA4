"use strict";

exports.__esModule = true;
exports.default = void 0;

var _link = require("../link/link");

var _keyCodes = require("../../utils/key-codes");

var _observeDom = require("../../utils/observe-dom");

var _id = require("../../mixins/id");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Private Helper component
var BTabButtonHelper = {
  name: 'BTabButtonHelper',
  props: {
    // Reference to the child b-tab instance
    tab: {
      default: null,
      required: true
    },
    id: {
      type: String,
      default: null
    },
    controls: {
      type: String,
      default: null
    },
    tabIndex: {
      type: Number,
      default: null
    },
    posInSet: {
      type: Number,
      default: null
    },
    setSize: {
      type: Number,
      default: null
    },
    noKeyNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus: function focus() {
      if (this.$refs && this.$refs.link && this.$refs.link.focus) {
        this.$refs.link.focus();
      }
    },
    handleEvt: function handleEvt(evt) {
      function stop() {
        evt.preventDefault();
        evt.stopPropagation();
      }

      if (this.tab.disabled) {
        return;
      }

      var type = evt.type;
      var key = evt.keyCode;
      var shift = evt.shiftKey;

      if (type === 'click') {
        stop();
        this.$emit('click', evt); // Could call this.tab.activate() instead
      } else if (type === 'keydown' && !this.noKeyNav && key === _keyCodes.default.SPACE) {
        // In keyNav mode, SAPCE press will also trigger a click/select
        stop();
        this.$emit('click', evt); // Could call this.tab.activate() instead
      } else if (type === 'keydown' && !this.noKeyNav) {
        // For keyboard navigation
        if (key === _keyCodes.default.UP || key === _keyCodes.default.LEFT || key === _keyCodes.default.HOME) {
          stop();

          if (shift || key === _keyCodes.default.HOME) {
            this.$emit('first', evt);
          } else {
            this.$emit('prev', evt);
          }
        } else if (key === _keyCodes.default.DOWN || key === _keyCodes.default.RIGHT || key === _keyCodes.default.END) {
          stop();

          if (shift || key === _keyCodes.default.END) {
            this.$emit('last', evt);
          } else {
            this.$emit('next', evt);
          }
        }
      }
    }
  },
  render: function render(h) {
    var link = h(_link.default, {
      ref: 'link',
      staticClass: 'nav-link',
      class: [{
        active: this.tab.localActive && !this.tab.disabled,
        disabled: this.tab.disabled
      }, this.tab.titleLinkClass],
      props: {
        href: this.tab.href,
        // To be deprecated to always be '#'
        disabled: this.tab.disabled
      },
      attrs: {
        role: 'tab',
        id: this.id,
        // Roving tab index when keynav enabled
        tabindex: this.tabIndex,
        'aria-selected': this.tab.localActive && !this.tab.disabled ? 'true' : 'false',
        'aria-setsize': this.setSize,
        'aria-posinset': this.posInSet,
        'aria-controls': this.controls
      },
      on: {
        click: this.handleEvt,
        keydown: this.handleEvt
      }
    }, [this.tab.$slots.title || this.tab.title]);
    return h('li', {
      staticClass: 'nav-item',
      class: [this.tab.titleItemClass],
      attrs: {
        role: 'presentation'
      }
    }, [link]);
  }
}; // Filter function to filter out disabled tabs

function notDisabled(tab) {
  return !tab.disabled;
} // @vue/component


var _default = {
  name: 'BTabs',
  mixins: [_id.default],
  provide: function provide() {
    return {
      bTabs: this
    };
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    card: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    pills: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    end: {
      // Synonym for 'bottom'
      type: Boolean,
      default: false
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noNavStyle: {
      type: Boolean,
      default: false
    },
    noKeyNav: {
      type: Boolean,
      default: false
    },
    lazy: {
      // This prop is sniffed by the tab child
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [String, Array, Object],
      default: null
    },
    navClass: {
      type: [String, Array, Object],
      default: null
    },
    navWrapperClass: {
      type: [String, Array, Object],
      default: null
    },
    value: {
      // v-model
      type: Number,
      default: null
    }
  },
  data: function data() {
    return {
      // Index of current tab
      currentTab: parseInt(this.value, 10) || -1,
      // Array of direct child b-tab instances
      tabs: []
    };
  },
  computed: {
    fade: function fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade;
    },
    navStyle: function navStyle() {
      return this.pills ? 'pills' : 'tabs';
    }
  },
  watch: {
    currentTab: function currentTab(val, old) {
      var index = -1; // Ensure only one tab is active at most

      this.tabs.forEach(function (tab, idx) {
        if (val === idx && !tab.disabled) {
          tab.localActive = true;
          index = idx;
        } else {
          tab.localActive = false;
        }
      }); // update the v-model

      this.$emit('input', index);
    },
    value: function value(val, old) {
      if (val !== old) {
        val = parseInt(val, 10);
        old = parseInt(old, 10) || 0;
        var tabs = this.tabs;

        if (tabs[val] && !tabs[val].disabled) {
          this.currentTab = val;
        } else {
          // Try next or prev tabs
          if (val < old) {
            this.previousTab();
          } else {
            this.nextTab();
          }
        }
      }
    }
  },
  created: function created() {
    // For SSR and to make sure only a single tab is shown on mount
    this.updateTabs();
  },
  mounted: function mounted() {
    // In case tabs have changed before mount
    this.updateTabs(); // Observe Child changes so we can update list of tabs

    (0, _observeDom.default)(this.$refs.tabsContainer, this.updateTabs.bind(this), {
      subtree: false
    });
  },
  methods: {
    // Update list of b-tab children
    updateTabs: function updateTabs() {
      // Probe tabs
      var tabs = (this.$slots.default || []).map(function (vnode) {
        return vnode.componentInstance;
      }).filter(function (tab) {
        return tab && tab._isTab;
      }); // Find *last* active non-disabled tab in current tabs
      // We trust tab state over currentTab, in case tabs were added/removed/re-ordered

      var tabIndex = tabs.indexOf(tabs.slice().reverse().find(function (tab) {
        return tab.localActive && !tab.disabled;
      })); // Else try setting to currentTab

      if (tabIndex < 0) {
        var currentTab = this.currentTab;

        if (currentTab >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = tabs.indexOf(tabs.slice().reverse().find(notDisabled));
        } else if (tabs[currentTab] && !tabs[currentTab].disabled) {
          // current tab is not disabled
          tabIndex = currentTab;
        }
      } // Else find *first* non-disabled tab in current tabs


      if (tabIndex < 0) {
        tabIndex = tabs.indexOf(tabs.find(notDisabled));
      } // Set the current tab state to active


      tabs.forEach(function (tab, idx) {
        tab.localActive = idx === tabIndex && !tab.disabled;
      }); // Update the array of tab children

      this.tabs = tabs; // Set the currentTab index (can be -1 if no non-disabled tabs)

      this.currentTab = tabIndex;
    },
    // Find a button taht controls a tab, given the tab reference
    // Returns the button vm instance
    getButtonForTab: function getButtonForTab(tab) {
      return (this.$refs.buttons || []).find(function (btn) {
        return btn.tab === tab;
      });
    },
    // Force a button to re-render it's content, given a b-tab instance
    // Called by b-tab on update()
    updateButton: function updateButton(tab) {
      var button = this.getButtonForTab(tab);

      if (button && button.$forceUpdate) {
        button.$forceUpdate();
      }
    },
    // Activate a tab given a b-tab instance
    // Also accessed by b-tab
    activateTab: function activateTab(tab) {
      var result = false;

      if (tab) {
        var index = this.tabs.indexOf(tab);

        if (!tab.disabled && index > -1) {
          result = true;
          this.currentTab = index;
        }
      }

      this.$emit('input', this.currentTab);
      return result;
    },
    // Deactivate a tab given a b-tab instance
    // Accessed by b-tab
    deactivateTab: function deactivateTab(tab) {
      if (tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no available tabs, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(function (t) {
          return t !== tab;
        }).find(notDisabled));
      } else {
        // No tab specified
        return false;
      }
    },
    // Focus a tab button given it's b-tab instance
    focusButton: function focusButton(tab) {
      var _this = this;

      // Wrap in nextTick to ensure DOM has completed rendering/updating before focusing
      this.$nextTick(function () {
        var button = _this.getButtonForTab(tab);

        if (button && button.focus) {
          button.focus();
        }
      });
    },
    // Emit a click event on a specified b-tab component instance
    emitTabClick: function emitTabClick(tab, evt) {
      if (evt && evt instanceof Event && tab && tab.$emit && !tab.disabled) {
        tab.$emit('click', evt);
      }
    },
    // Click Handler
    clickTab: function clickTab(tab, evt) {
      this.activateTab(tab);
      this.emitTabClick(tab, evt);
    },
    // Move to first non-disabled tab
    firstTab: function firstTab(focus) {
      var tab = this.tabs.find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to previous non-disabled tab
    previousTab: function previousTab(focus) {
      var currentIndex = Math.max(this.currentTab, 0);
      var tab = this.tabs.slice(0, currentIndex).reverse().find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to next non-disabled tab
    nextTab: function nextTab(focus) {
      var currentIndex = Math.max(this.currentTab, -1);
      var tab = this.tabs.slice(currentIndex + 1).find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to last non-disabled tab
    lastTab: function lastTab(focus) {
      var tab = this.tabs.slice().reverse().find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    }
  },
  render: function render(h) {
    var _this2 = this,
        _ref;

    var tabs = this.tabs; // Currently active tab

    var activeTab = tabs.find(function (tab) {
      return tab.localActive && !tab.disabled;
    }); // Tab button to allow focusing when no actgive tab found (keynav only)

    var fallbackTab = tabs.find(function (tab) {
      return !tab.disabled;
    }); // For each b-tab found create the tab buttons

    var buttons = tabs.map(function (tab, index) {
      var buttonId = tab.controlledBy || _this2.safeId("_BV_tab_".concat(index + 1, "_"));

      var tabIndex = null; // Ensure at least one tab button is focusable when keynav enabled (if possible)

      if (!_this2.noKeyNav) {
        // Buttons are not in tab index unless active, or a fallback tab
        tabIndex = -1;

        if (activeTab === tab || !activeTab && fallbackTab === tab) {
          // Place tab button in tab sequence
          tabIndex = null;
        }
      }

      return h(BTabButtonHelper, {
        key: tab._uid || buttonId || index,
        ref: 'buttons',
        // Needed to make this.$refs.buttons an array
        refInFor: true,
        props: {
          tab: tab,
          id: buttonId,
          controls: _this2.safeId('_BV_tab_container_'),
          tabIndex: tabIndex,
          setSize: tabs.length,
          posInSet: index + 1,
          noKeyNav: _this2.noKeyNav
        },
        on: {
          click: function click(evt) {
            _this2.clickTab(tab, evt);
          },
          first: _this2.firstTab,
          prev: _this2.previousTab,
          next: _this2.nextTab,
          last: _this2.lastTab
        }
      });
    }); // Nav 'button' wrapper

    var navs = h('ul', {
      class: ['nav', (_ref = {}, _defineProperty(_ref, "nav-".concat(this.navStyle), !this.noNavStyle), _defineProperty(_ref, "card-header-".concat(this.navStyle), this.card && !this.vertical), _defineProperty(_ref, 'card-header', this.card && this.vertical), _defineProperty(_ref, 'h-100', this.card && this.vertical), _defineProperty(_ref, 'flex-column', this.vertical), _defineProperty(_ref, 'border-bottom-0', this.vertical), _defineProperty(_ref, 'rounded-0', this.vertical), _defineProperty(_ref, "small", this.small), _ref), this.navClass],
      attrs: {
        role: 'tablist',
        id: this.safeId('_BV_tab_controls_')
      }
    }, [buttons, this.$slots.tabs]);
    navs = h('div', {
      class: [{
        'card-header': this.card && !this.vertical && !(this.end || this.bottom),
        'card-footer': this.card && !this.vertical && (this.end || this.bottom),
        'col-auto': this.vertical
      }, this.navWrapperClass]
    }, [navs]);
    var empty;

    if (tabs && tabs.length) {
      empty = h(false);
    } else {
      empty = h('div', {
        key: 'empty-tab',
        class: ['tab-pane', 'active', {
          'card-body': this.card
        }]
      }, this.$slots.empty);
    } // Main content section


    var content = h('div', {
      ref: 'tabsContainer',
      staticClass: 'tab-content',
      class: [{
        col: this.vertical
      }, this.contentClass],
      attrs: {
        id: this.safeId('_BV_tab_container_')
      }
    }, [this.$slots.default, empty]); // Render final output

    return h(this.tag, {
      staticClass: 'tabs',
      class: {
        row: this.vertical,
        'no-gutters': this.vertical && this.card
      },
      attrs: {
        id: this.safeId()
      }
    }, [this.end || this.bottom ? content : h(false), [navs], this.end || this.bottom ? h(false) : content]);
  }
};
exports.default = _default;