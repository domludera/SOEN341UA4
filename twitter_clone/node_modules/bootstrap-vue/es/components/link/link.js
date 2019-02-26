"use strict";

exports.__esModule = true;
exports.propsFactory = propsFactory;
exports.pickLinkProps = pickLinkProps;
exports.omitLinkProps = omitLinkProps;
exports.default = exports.computed = exports.props = void 0;

var _object = require("../../utils/object");

var _array = require("../../utils/array");

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * The Link component is used in many other BV components.
 * As such, sharing its props makes supporting all its features easier.
 * However, some components need to modify the defaults for their own purpose.
 * Prefer sharing a fresh copy of the props to ensure mutations
 * do not affect other component references to the props.
 *
 * https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
 * @return {{}}
 */
function propsFactory() {
  return {
    href: {
      type: String,
      default: null
    },
    rel: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: '_self'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // router-link specific props
    to: {
      type: [String, Object],
      default: null
    },
    append: {
      type: Boolean,
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    activeClass: {
      type: String // default: undefined

    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String // default: undefined

    },
    routerTag: {
      type: String,
      default: 'a'
    },
    // nuxt-link specific prop(s)
    noPrefetch: {
      type: Boolean,
      default: false
    }
  };
}

var props = propsFactory();
exports.props = props;

function pickLinkProps(propsToPick) {
  var freshLinkProps = propsFactory(); // Normalize everything to array.

  propsToPick = (0, _array.concat)(propsToPick);
  return (0, _object.keys)(freshLinkProps).reduce(function (memo, prop) {
    if ((0, _array.arrayIncludes)(propsToPick, prop)) {
      memo[prop] = freshLinkProps[prop];
    }

    return memo;
  }, {});
}

function omitLinkProps(propsToOmit) {
  var freshLinkProps = propsFactory(); // Normalize everything to array.

  propsToOmit = (0, _array.concat)(propsToOmit);
  return (0, _object.keys)(props).reduce(function (memo, prop) {
    if (!(0, _array.arrayIncludes)(propsToOmit, prop)) {
      memo[prop] = freshLinkProps[prop];
    }

    return memo;
  }, {});
}

var computed = {
  linkProps: function linkProps() {
    var linkProps = {};
    var propKeys = (0, _object.keys)(props);

    for (var i = 0; i < propKeys.length; i++) {
      var prop = propKeys[i]; // Computed Vue getters are bound to the instance.

      linkProps[prop] = this[prop];
    }

    return linkProps;
  }
};
exports.computed = computed;

function computeTag(props, parent) {
  return parent.$router && props.to && !props.disabled ? parent.$nuxt ? 'nuxt-link' : 'router-link' : 'a';
}

function isRouterLink(tag) {
  return tag !== 'a';
}

function computeHref(_ref, tag) {
  var disabled = _ref.disabled,
      href = _ref.href,
      to = _ref.to;

  // We've already checked the parent.$router in computeTag,
  // so isRouterLink(tag) indicates a live router.
  // When deferring to Vue Router's router-link, don't use the href attr at all.
  // We return null, and then remove href from the attributes passed to router-link
  if (isRouterLink(tag)) {
    return null;
  } // If href explicitly provided


  if (href) {
    return href;
  } // Reconstruct `href` when `to` used, but no router


  if (to) {
    // Fallback to `to` prop (if `to` is a string)
    if (typeof to === 'string') {
      return to;
    } // Fallback to `to.path` prop (if `to` is an object)


    if (_typeof(to) === 'object' && typeof to.path === 'string') {
      return to.path;
    }
  } // If nothing is provided use '#' as a fallback


  return '#';
}

function computeRel(_ref2) {
  var target = _ref2.target,
      rel = _ref2.rel;

  if (target === '_blank' && rel === null) {
    return 'noopener';
  }

  return rel || null;
}

function clickHandlerFactory(_ref3) {
  var disabled = _ref3.disabled,
      tag = _ref3.tag,
      href = _ref3.href,
      suppliedHandler = _ref3.suppliedHandler,
      parent = _ref3.parent;
  return function onClick(e) {
    if (disabled && e instanceof Event) {
      // Stop event from bubbling up.
      e.stopPropagation(); // Kill the event loop attached to this specific EventTarget.

      e.stopImmediatePropagation();
    } else {
      if (isRouterLink(tag) && e.target.__vue__) {
        e.target.__vue__.$emit('click', e);
      }

      if (typeof suppliedHandler === 'function') {
        suppliedHandler.apply(void 0, arguments);
      }

      parent.$root.$emit('clicked::link', e);
    }

    if (!isRouterLink(tag) && href === '#' || disabled) {
      // Stop scroll-to-top behavior or navigation.
      e.preventDefault();
    }
  };
} // @vue/component


var _default = {
  name: 'BLink',
  functional: true,
  props: propsFactory(),
  render: function render(h, _ref4) {
    var props = _ref4.props,
        data = _ref4.data,
        parent = _ref4.parent,
        children = _ref4.children;
    var tag = computeTag(props, parent);
    var rel = computeRel(props);
    var href = computeHref(props, tag);
    var eventType = isRouterLink(tag) ? 'nativeOn' : 'on';
    var suppliedHandler = (data[eventType] || {}).click;
    var handlers = {
      click: clickHandlerFactory({
        tag: tag,
        href: href,
        disabled: props.disabled,
        suppliedHandler: suppliedHandler,
        parent: parent
      })
    };
    var componentData = (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: {
        active: props.active,
        disabled: props.disabled
      },
      attrs: {
        rel: rel,
        target: props.target,
        tabindex: props.disabled ? '-1' : data.attrs ? data.attrs.tabindex : null,
        'aria-disabled': props.disabled ? 'true' : null
      },
      props: _objectSpread({}, props, {
        tag: props.routerTag
      })
    }); // If href attribute exists on router-link (even undefined or null) it fails working on SSR
    // So we explicitly add it here if needed (i.e. if computeHref() is truthy)

    if (href) {
      componentData.attrs.href = href;
    } // We want to overwrite any click handler since our callback
    // will invoke the user supplied handler if !props.disabled


    componentData[eventType] = _objectSpread({}, componentData[eventType] || {}, handlers);
    return h(tag, componentData, children);
  }
};
exports.default = _default;