import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React from 'react';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reactivate(array) {
  var elements = array.map(createElement);
  return React.createElement(React.Fragment, null, elements);
}

function createElement(item, key) {
  if (item instanceof Object) {
    var type = item.type,
        props = item.props,
        children = item.children;
    var contents = children instanceof Array ? children.map(createElement) : undefined;
    return React.createElement(type, _objectSpread({}, props, {
      key: key
    }), contents);
  } else {
    return item;
  }
}

export { reactivate };
