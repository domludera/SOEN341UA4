"use strict";

exports.__esModule = true;
exports.hasPointerEvent = exports.hasTouchSupport = exports.isServer = exports.inBrowser = void 0;
// Info about the current environment
var inBrowser = typeof document !== 'undefined' && typeof window !== 'undefined';
exports.inBrowser = inBrowser;
var isServer = !inBrowser;
exports.isServer = isServer;
var hasTouchSupport = inBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0);
exports.hasTouchSupport = hasTouchSupport;
var hasPointerEvent = inBrowser && Boolean(window.PointerEvent || window.MSPointerEvent);
exports.hasPointerEvent = hasPointerEvent;