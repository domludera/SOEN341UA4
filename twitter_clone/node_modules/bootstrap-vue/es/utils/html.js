"use strict";

exports.__esModule = true;
exports.stripTags = stripTags;
exports.htmlOrText = htmlOrText;
var stripTagsRegex = /(<([^>]+)>)/gi;

function stripTags() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return text.replace(stripTagsRegex, '');
}

function htmlOrText(innerHTML, textContent) {
  return innerHTML ? {
    innerHTML: innerHTML
  } : {
    textContent: textContent
  };
}