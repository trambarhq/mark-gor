import Preact from 'preact';

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

export { preactivate };
