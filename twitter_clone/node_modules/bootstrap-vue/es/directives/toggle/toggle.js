"use strict";

exports.__esModule = true;
exports.default = void 0;

var _target = require("../../utils/target");

var _dom = require("../../utils/dom");

// Are we client side?
var inBrowser = typeof window !== 'undefined'; // target listen types

var listenTypes = {
  click: true // Property key for handler storage

};
var BVT = '__BV_toggle__'; // Emitted Control Event for collapse (emitted to collapse)

var EVENT_TOGGLE = 'bv::toggle::collapse'; // Listen to Event for toggle state update (Emited by collapse)

var EVENT_STATE = 'bv::collapse::state';
var _default = {
  bind: function bind(el, binding, vnode) {
    var targets = (0, _target.default)(vnode, binding, listenTypes, function (_ref) {
      var targets = _ref.targets,
          vnode = _ref.vnode;
      targets.forEach(function (target) {
        vnode.context.$root.$emit(EVENT_TOGGLE, target);
      });
    });

    if (inBrowser && vnode.context && targets.length > 0) {
      // Add aria attributes to element
      (0, _dom.setAttr)(el, 'aria-controls', targets.join(' '));
      (0, _dom.setAttr)(el, 'aria-expanded', 'false');

      if (el.tagName !== 'BUTTON') {
        // If element is not a button, we add `role="button"` for accessibility
        (0, _dom.setAttr)(el, 'role', 'button');
      } // Toggle state hadnler, stored on element


      el[BVT] = function toggleDirectiveHandler(id, state) {
        if (targets.indexOf(id) !== -1) {
          // Set aria-expanded state
          (0, _dom.setAttr)(el, 'aria-expanded', state ? 'true' : 'false'); // Set/Clear 'collapsed' class state

          if (state) {
            (0, _dom.removeClass)(el, 'collapsed');
          } else {
            (0, _dom.addClass)(el, 'collapsed');
          }
        }
      }; // Listen for toggle state changes


      vnode.context.$root.$on(EVENT_STATE, el[BVT]);
    }
  },
  unbind: function unbind(el, binding, vnode) {
    if (el[BVT]) {
      // Remove our $root listener
      vnode.context.$root.$off(EVENT_STATE, el[BVT]);
      el[BVT] = null;
    }
  }
};
exports.default = _default;