import { default as Preact } from 'preact';

function preactivate(array) {
  const elements = array.map(createElement);
  return Preact.createElement(Preact.Fragment, null, elements);
}

function createElement(item, key) {
  if (item instanceof Object) {
    const { type, props, children } = item;
    const contents = children instanceof Array
                   ? children.map(createElement)
                   : undefined;
    return Preact.createElement(type, props, contents);
  } else {
    return item;
  }
}

export {
  preactivate,
};
