"use strict";

exports.__esModule = true;
exports.default = void 0;

var _id = require("../../mixins/id");

// @vue/component
var _default2 = {
  name: 'BTab',
  mixins: [_id.default],
  inject: {
    bTabs: {
      default: function _default() {
        return {
          // Dont set a tab index if not rendered inside b-tabs
          noKeyNav: true
        };
      }
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    buttonId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleItemClass: {
      // Sniffed by tabs.js and added to nav 'li.nav-item'
      type: [String, Array, Object],
      default: null
    },
    titleLinkClass: {
      // Sniffed by tabs.js and added to nav 'a.nav-link'
      type: [String, Array, Object],
      default: null
    },
    headHtml: {
      // Is this actually ever used?
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBody: {
      type: Boolean,
      default: false
    },
    href: {
      // This should be deprecated, as tabs are not navigation (URL) based
      // <b-nav> + <b-card> + <router-view>/<nuxt-child> should be used instead
      // And we dont support router-links here
      type: String,
      default: '#'
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      localActive: this.active && !this.disabled,
      show: false
    };
  },
  computed: {
    tabClasses: function tabClasses() {
      return [this.bTabs.card && !this.noBody ? 'card-body' : '', this.show ? 'show' : '', this.computedFade ? 'fade' : '', this.disabled ? 'disabled' : '', this.localActive ? 'active' : ''];
    },
    controlledBy: function controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__');
    },
    computedFade: function computedFade() {
      return this.bTabs.fade || false;
    },
    computedLazy: function computedLazy() {
      return this.bTabs.lazy || this.lazy;
    },
    _isTab: function _isTab() {
      // For parent sniffing of child
      return true;
    }
  },
  watch: {
    localActive: function localActive(newVal, oldVal) {
      // Make 'active' prop work with `.sync` modifier
      this.$emit('update:active', newVal);
    },
    active: function active(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal) {
          // If activated post mount
          this.activate();
        } else {
          if (!this.deactivate()) {
            // Tab couldn't be deactivated, so we reset the synced active prop
            // Deactivation will fail if no other tabs to activate.
            this.$emit('update:active', this.localActive);
          }
        }
      }
    },
    disabled: function disabled(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && this.localActive && this.bTabs.firstTab) {
          this.localActive = false;
          this.bTabs.firstTab();
        }
      }
    }
  },
  mounted: function mounted() {
    // Initially show on mount if active and not disabled
    this.show = this.localActive;
  },
  updated: function updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    if (this.$slots.title && this.bTabs.updateButton) {
      this.bTabs.updateButton(this);
    }
  },
  methods: {
    // Transition handlers
    beforeEnter: function beforeEnter()
    /* instanbul ignore next: difficult to test rAF in JSDOM */
    {
      var _this = this;

      // change opacity (add 'show' class) 1 frame after display
      // otherwise css transition won't happen
      // TODO: Move raf method into utils/dom.js
      var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
      /* istanbul ignore next */
      function (cb) {
        setTimeout(cb, 16);
      };

      raf(function () {
        _this.show = true;
      });
    },
    beforeLeave: function beforeLeave()
    /* instanbul ignore next: difficult to test rAF in JSDOM */
    {
      // Remove the 'show' class
      this.show = false;
    },
    // Public methods
    activate: function activate() {
      if (this.bTabs.activateTab && !this.disabled) {
        return this.bTabs.activateTab(this);
      } else {
        // Not inside a b-tabs component or tab is disabled
        return false;
      }
    },
    deactivate: function deactivate() {
      if (this.bTabs.deactivateTab && this.localActive) {
        return this.bTabs.deactivateTab(this);
      } else {
        // Not inside a b-tabs component or not active to begin with
        return false;
      }
    }
  },
  render: function render(h) {
    var content = h(this.tag, {
      ref: 'panel',
      staticClass: 'tab-pane',
      class: this.tabClasses,
      directives: [{
        name: 'show',
        value: this.localActive
      }],
      attrs: {
        role: 'tabpanel',
        id: this.safeId(),
        tabindex: this.localActive && !this.bTabs.noKeyNav ? '0' : null,
        'aria-hidden': this.localActive ? 'false' : 'true',
        'aria-expanded': this.localActive ? 'true' : 'false',
        'aria-labelledby': this.controlledBy || null
      }
    }, // Render content lazily if requested
    [this.localActive || !this.computedLazy ? this.$slots.default : h(false)]);
    return h('transition', {
      props: {
        mode: 'out-in'
      },
      on: {
        beforeEnter: this.beforeEnter,
        beforeLeave: this.beforeLeave
      }
    }, [content]);
  }
};
exports.default = _default2;