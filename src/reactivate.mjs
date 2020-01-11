import { default as React } from 'react';

function reactivate(array) {
  const elements = array.map(createElement);
  return React.createElement(React.Fragment, null, elements);
}

function createElement(item, key) {
  if (item instanceof Object) {
    const { type, props, children } = item;
    const contents = children instanceof Array
                   ? children.map(createElement)
                   : undefined;
    return React.createElement(type, { ...props, key }, contents);
  } else {
    return item;
  }
}

export {
  reactivate,
};
