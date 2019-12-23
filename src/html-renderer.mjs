import { escape } from './helpers.mjs';
import { BaseRenderer } from './base-renderer.mjs';

class HtmlRenderer extends BaseRenderer {
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

  render(tokens) {
    return super.render(tokens).toString();
  }
}

const isVoid = {
  br: true,
  hr: true,
  img: true,
};

export {
  HtmlRenderer,
  HtmlRenderer as default,
};
