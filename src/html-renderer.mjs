import React from 'react';
import { escape } from './helpers.mjs';
import { JSONRenderer } from './json-renderer.mjs';

class HTMLRenderer extends JSONRenderer {
  createElement(type, props, children) {
    let html = `<${type}`;
    if (props) {
      for (let [ key, value ] of Object.entries(props)) {
        if (key === 'className') {
            key = 'class';
        }
        html += ` ${key}="${escape(value)}"`;
      }
    }
    html += '>';
    if (children) {
      if (!(children instanceof Array)) {
        children = [ children ];
      }
      const content = [];
      for (let child of children) {
        if (typeof(child) === 'string') {
          child = escape(child);
        }
        content.push(child);
      }
      html += content.join('');
    }
    if (!isVoid[type]) {
      html += `</${type}>`;
    }
    return new String(html);
  }
}

const isVoid = {
  br: true,
  hr: true,
  img: true,
};

export {
  HTMLRenderer,
  HTMLRenderer as default,
};
