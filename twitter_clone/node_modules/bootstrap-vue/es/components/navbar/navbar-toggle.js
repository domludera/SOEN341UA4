"use strict";

exports.__esModule = true;
exports.default = void 0;

var _listenOnRoot = require("../../mixins/listen-on-root");

// @vue/component
var _default = {
  name: 'BNavbarToggle',
  mixins: [_listenOnRoot.default],
  props: {
    label: {
      type: String,
      default: 'Toggle navigation'
    },
    target: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      toggleState: false
    };
  },
  created: function created() {
    this.listenOnRoot('bv::collapse::state', this.handleStateEvt);
  },
  methods: {
    onClick: function onClick(evt) {
      this.$emit('click', evt);
      /* istanbul ignore next */

      if (!evt.defaultPrevented) {
        this.$root.$emit('bv::toggle::collapse', this.target);
      }
    },
    handleStateEvt: function handleStateEvt(id, state) {
      if (id === this.target) {
        this.toggleState = state;
      }
    }
  },
  render: function render(h) {
    return h('button', {
      class: ['navbar-toggler'],
      attrs: {
        type: 'button',
        'aria-label': this.label,
        'aria-controls': this.target,
        'aria-expanded': this.toggleState ? 'true' : 'false'
      },
      on: {
        click: this.onClick
      }
    }, [this.$slots.default || h('span', {
      class: ['navbar-toggler-icon']
    })]);
  }
};
exports.default = _default;