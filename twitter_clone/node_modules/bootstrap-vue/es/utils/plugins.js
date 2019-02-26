"use strict";

exports.__esModule = true;
exports.registerComponent = registerComponent;
exports.registerComponents = registerComponents;
exports.registerDirective = registerDirective;
exports.registerDirectives = registerDirectives;
exports.vueUse = vueUse;

/**
 * Register a component plugin as being loaded. returns true if component plugin already registered
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */
function registerComponent(Vue, name, def) {
  Vue._bootstrap_vue_components_ = Vue._bootstrap_vue_components_ || {};
  var loaded = Vue._bootstrap_vue_components_[name];

  if (!loaded && def && name) {
    Vue._bootstrap_vue_components_[name] = true;
    Vue.component(name, def);
  }

  return loaded;
}
/**
 * Register a group of components as being loaded.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */


function registerComponents(Vue, components) {
  for (var component in components) {
    registerComponent(Vue, component, components[component]);
  }
}
/**
 * Register a directive as being loaded. returns true if directive plugin already registered
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */


function registerDirective(Vue, name, def) {
  Vue._bootstrap_vue_directives_ = Vue._bootstrap_vue_directives_ || {};
  var loaded = Vue._bootstrap_vue_directives_[name];

  if (!loaded && def && name) {
    Vue._bootstrap_vue_directives_[name] = true;
    Vue.directive(name, def);
  }

  return loaded;
}
/**
 * Register a group of directives as being loaded.
 * @param {object} Vue
 * @param {object} Object of directive definitions
 */


function registerDirectives(Vue, directives) {
  for (var directive in directives) {
    registerDirective(Vue, directive, directives[directive]);
  }
}
/**
 * Install plugin if window.Vue available
 * @param {object} Plugin definition
 */


function vueUse(VuePlugin) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
  }
}