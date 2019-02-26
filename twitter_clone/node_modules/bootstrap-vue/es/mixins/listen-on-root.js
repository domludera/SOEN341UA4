"use strict";

exports.__esModule = true;
exports.default = void 0;

var _array = require("../utils/array");

/**
 * Issue #569: collapse::toggle::state triggered too many times
 * @link https://github.com/bootstrap-vue/bootstrap-vue/issues/569
 */
var BVRL = '__BV_root_listeners__'; // @vue/component

var _default = {
  beforeDestroy: function beforeDestroy() {
    if (this[BVRL] && (0, _array.isArray)(this[BVRL])) {
      while (this[BVRL].length > 0) {
        // shift to process in order
        var _this$BVRL$shift = this[BVRL].shift(),
            event = _this$BVRL$shift.event,
            callback = _this$BVRL$shift.callback;

        this.$root.$off(event, callback);
      }
    }
  },
  methods: {
    /**
     * Safely register event listeners on the root Vue node.
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on root and is destroyed,
     * this orphans a callback because the node is gone,
     * but the root does not clear the callback.
     *
     * This adds a non-reactive prop to a vm on the fly
     * in order to avoid object observation and its performance costs
     * to something that needs no reactivity.
     * It should be highly unlikely there are any naming collisions.
     * @param {string} event
     * @param {function} callback
     * @chainable
     */
    listenOnRoot: function listenOnRoot(event, callback) {
      if (!this[BVRL] || !(0, _array.isArray)(this[BVRL])) {
        this[BVRL] = [];
      }

      this[BVRL].push({
        event: event,
        callback: callback
      });
      this.$root.$on(event, callback);
      return this;
    },

    /**
     * Convenience method for calling vm.$emit on vm.$root.
     * @param {string} event
     * @param {*} args
     * @chainable
     */
    emitOnRoot: function emitOnRoot(event) {
      var _this$$root;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$$root = this.$root).$emit.apply(_this$$root, [event].concat(args));

      return this;
    }
  }
};
exports.default = _default;