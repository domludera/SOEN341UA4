"use strict";

exports.__esModule = true;
exports.default = void 0;

var _form = require("./form");

var _formRow = require("./form-row");

var _formText = require("./form-text");

var _formInvalidFeedback = require("./form-invalid-feedback");

var _formValidFeedback = require("./form-valid-feedback");

var _plugins = require("../../utils/plugins");

var components = {
  BForm: _form.default,
  BFormRow: _formRow.default,
  BFormText: _formText.default,
  BFormInvalidFeedback: _formInvalidFeedback.default,
  BFormFeedback: _formInvalidFeedback.default,
  BFormValidFeedback: _formValidFeedback.default
};
var _default = {
  install: function install(Vue) {
    (0, _plugins.registerComponents)(Vue, components);
  }
};
exports.default = _default;