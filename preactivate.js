(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('preact')) :
  typeof define === 'function' && define.amd ? define(['exports', 'preact'], factory) :
  (global = global || self, factory(global.markGor = {}, global.Preact));
}(this, (function (exports, Preact) { 'use strict';

  Preact = Preact && Preact.hasOwnProperty('default') ? Preact['default'] : Preact;

  function preactivate(array) {
    var elements = array.map(createElement);
    return Preact.createElement(Preact.Fragment, null, elements);
  }

  function createElement(item, key) {
    if (item instanceof Object) {
      var type = item.type,
          props = item.props,
          children = item.children;
      var contents = children instanceof Array ? children.map(createElement) : undefined;
      return Preact.createElement(type, props, contents);
    } else {
      return item;
    }
  }

  exports.preactivate = preactivate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
