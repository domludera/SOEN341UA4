"use strict";

exports.__esModule = true;
exports.position = exports.offset = exports.getCS = exports.getBCR = exports.hasAttr = exports.getAttr = exports.removeAttr = exports.setAttr = exports.hasClass = exports.removeClass = exports.addClass = exports.getById = exports.contains = exports.closest = exports.matches = exports.select = exports.selectAll = exports.reflow = exports.isDisabled = exports.isVisible = exports.isElement = exports.eventOff = exports.eventOn = void 0;

var _array = require("./array");

var _env = require("./env");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Determine if the browser supports the option passive for events
var passiveEventSupported = false;
/* istanbul ignore if */

if (_env.inBrowser) {
  try {
    var options = {
      get passive() {
        // This function will be called when the browser
        // attempts to access the passive property.
        passiveEventSupported = true;
      }

    };
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveEventSupported = false;
  }
} // Normalize event options based on support of passive option


function parseEventOptions(options) {
  var useCapture = false;

  if (options) {
    if (_typeof(options) === 'object') {
      // eslint-disable-next-line no-unneeded-ternary
      useCapture = options.useCapture ? true : false;
    } else {
      useCapture = options;
    }
  }

  return passiveEventSupported ? options : useCapture;
} // Attach an event listener to an element


var eventOn = function eventOn(el, evtName, handler, options) {
  if (el && el.addEventListener) {
    el.addEventListener(evtName, handler, parseEventOptions(options));
  }
}; // Remove an event listener from an element


exports.eventOn = eventOn;

var eventOff = function eventOff(el, evtName, handler, options) {
  if (el && el.removeEventListener) {
    el.removeEventListener(evtName, handler, parseEventOptions(options));
  }
}; // Determine if an element is an HTML Element


exports.eventOff = eventOff;

var isElement = function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
}; // Determine if an HTML element is visible - Faster than CSS check


exports.isElement = isElement;

var isVisible = function isVisible(el) {
  /* istanbul ignore next: getBoundingClientRect not avaiable in JSDOM */
  return isElement(el) && document.body.contains(el) && el.getBoundingClientRect().height > 0 && el.getBoundingClientRect().width > 0;
}; // Determine if an element is disabled


exports.isVisible = isVisible;

var isDisabled = function isDisabled(el) {
  return !isElement(el) || el.disabled || el.classList.contains('disabled') || Boolean(el.getAttribute('disabled'));
}; // Cause/wait-for an element to reflow it's content (adjusting it's height/width)


exports.isDisabled = isDisabled;

var reflow = function reflow(el) {
  // requsting an elements offsetHight will trigger a reflow of the element content

  /* istanbul ignore next: reflow doesnt happen in JSDOM */
  return isElement(el) && el.offsetHeight;
}; // Select all elements matching selector. Returns [] if none found


exports.reflow = reflow;

var selectAll = function selectAll(selector, root) {
  if (!isElement(root)) {
    root = document;
  }

  return (0, _array.from)(root.querySelectorAll(selector));
}; // Select a single element, returns null if not found


exports.selectAll = selectAll;

var select = function select(selector, root) {
  if (!isElement(root)) {
    root = document;
  }

  return root.querySelector(selector) || null;
}; // Determine if an element matches a selector


exports.select = select;

var matches = function matches(el, selector) {
  if (!isElement(el)) {
    return false;
  } // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
  // Prefer native implementations over polyfill function


  var proto = Element.prototype;
  /* istanbul ignore next */

  var Matches = proto.matches || proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector || function (sel)
  /* istanbul ignore next */
  {
    var element = this;
    var m = selectAll(sel, element.document || element.ownerDocument);
    var i = m.length; // eslint-disable-next-line no-empty

    while (--i >= 0 && m.item(i) !== element) {}

    return i > -1;
  };

  return Matches.call(el, selector);
}; // Finds closest element matching selector. Returns null if not found


exports.matches = matches;

var closest = function closest(selector, root) {
  if (!isElement(root)) {
    return null;
  } // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  // Since we dont support IE < 10, we can use the "Matches" version of the polyfill for speed
  // Prefer native implementation over polyfill function

  /* istanbul ignore next */


  var Closest = Element.prototype.closest || function (sel) {
    var element = this;

    if (!document.documentElement.contains(element)) {
      return null;
    }

    do {
      // Use our "patched" matches function
      if (matches(element, sel)) {
        return element;
      }

      element = element.parentElement;
    } while (element !== null);

    return null;
  };

  var el = Closest.call(root, selector); // Emulate jQuery closest and return null if match is the passed in element (root)

  return el === root ? null : el;
}; // Returns true if the parent element contains the child element


exports.closest = closest;

var contains = function contains(parent, child) {
  if (!parent || typeof parent.contains !== 'function') {
    return false;
  }

  return parent.contains(child);
}; // Get an element given an ID


exports.contains = contains;

var getById = function getById(id) {
  return document.getElementById(/^#/.test(id) ? id.slice(1) : id) || null;
}; // Add a class to an element


exports.getById = getById;

var addClass = function addClass(el, className) {
  if (className && isElement(el)) {
    el.classList.add(className);
  }
}; // Remove a class from an element


exports.addClass = addClass;

var removeClass = function removeClass(el, className) {
  if (className && isElement(el)) {
    el.classList.remove(className);
  }
}; // Test if an element has a class


exports.removeClass = removeClass;

var hasClass = function hasClass(el, className) {
  if (className && isElement(el)) {
    return el.classList.contains(className);
  }

  return false;
}; // Set an attribute on an element


exports.hasClass = hasClass;

var setAttr = function setAttr(el, attr, value) {
  if (attr && isElement(el)) {
    el.setAttribute(attr, value);
  }
}; // Remove an attribute from an element


exports.setAttr = setAttr;

var removeAttr = function removeAttr(el, attr) {
  if (attr && isElement(el)) {
    el.removeAttribute(attr);
  }
}; // Get an attribute value from an element (returns null if not found)


exports.removeAttr = removeAttr;

var getAttr = function getAttr(el, attr) {
  if (attr && isElement(el)) {
    return el.getAttribute(attr);
  }

  return null;
}; // Determine if an attribute exists on an element (returns true or false, or null if element not found)


exports.getAttr = getAttr;

var hasAttr = function hasAttr(el, attr) {
  if (attr && isElement(el)) {
    return el.hasAttribute(attr);
  }

  return null;
}; // Return the Bounding Client Rec of an element. Retruns null if not an element

/* istanbul ignore next: getBoundingClientRect() doesnt work in JSDOM */


exports.hasAttr = hasAttr;

var getBCR = function getBCR(el) {
  return isElement(el) ? el.getBoundingClientRect() : null;
}; // Get computed style object for an element

/* istanbul ignore next: getComputedStyle() doesnt work in JSDOM */


exports.getBCR = getBCR;

var getCS = function getCS(el) {
  return isElement(el) ? window.getComputedStyle(el) : {};
}; // Return an element's offset wrt document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset

/* istanbul ignore next: getBoundingClientRect(), getClientRects() doesnt work in JSDOM */


exports.getCS = getCS;

var offset = function offset(el) {
  if (isElement(el)) {
    if (!el.getClientRects().length) {
      return {
        top: 0,
        left: 0
      };
    }

    var bcr = getBCR(el);
    var win = el.ownerDocument.defaultView;
    return {
      top: bcr.top + win.pageYOffset,
      left: bcr.left + win.pageXOffset
    };
  }
}; // Return an element's offset wrt to it's offsetParent
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.position

/* istanbul ignore next: getBoundingClientRect(), getClientRects() doesnt work in JSDOM */


exports.offset = offset;

var position = function position(el) {
  if (!isElement(el)) {
    return;
  }

  var parentOffset = {
    top: 0,
    left: 0
  };
  var offsetSelf;
  var offsetParent;

  if (getCS(el).position === 'fixed') {
    offsetSelf = getBCR(el);
  } else {
    offsetSelf = offset(el);
    var doc = el.ownerDocument;
    offsetParent = el.offsetParent || doc.documentElement;

    while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && getCS(offsetParent).position === 'static') {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
      parentOffset = offset(offsetParent);
      parentOffset.top += parseFloat(getCS(offsetParent).borderTopWidth);
      parentOffset.left += parseFloat(getCS(offsetParent).borderLeftWidth);
    }
  }

  return {
    top: offsetSelf.top - parentOffset.top - parseFloat(getCS(el).marginTop),
    left: offsetSelf.left - parentOffset.left - parseFloat(getCS(el).marginLeft)
  };
};

exports.position = position;