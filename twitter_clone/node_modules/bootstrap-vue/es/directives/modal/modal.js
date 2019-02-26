"use strict";

exports.__esModule = true;
exports.default = void 0;

var _target = require("../../utils/target");

var _dom = require("../../utils/dom");

var listenTypes = {
  click: true
};
var _default = {
  // eslint-disable-next-line no-shadow-restricted-names
  bind: function bind(el, binding, vnode) {
    (0, _target.bindTargets)(vnode, binding, listenTypes, function (_ref) {
      var targets = _ref.targets,
          vnode = _ref.vnode;
      targets.forEach(function (target) {
        vnode.context.$root.$emit('bv::show::modal', target, vnode.elm);
      });
    });

    if (el.tagName !== 'BUTTON') {
      // If element is not a button, we add `role="button"` for accessibility
      (0, _dom.setAttr)(el, 'role', 'button');
    }
  },
  unbind: function unbind(el, binding, vnode) {
    (0, _target.unbindTargets)(vnode, binding, listenTypes);

    if (el.tagName !== 'BUTTON') {
      // If element is not a button, we add `role="button"` for accessibility
      (0, _dom.removeAttr)(el, 'role', 'button');
    }
  }
};
exports.default = _default;