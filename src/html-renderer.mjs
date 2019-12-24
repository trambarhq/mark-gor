import { escape } from './helpers.mjs';
import { BaseRenderer } from './base-renderer.mjs';

class HtmlRenderer extends BaseRenderer {
  createElement(type, props, children) {
    let html = `<${type}`;
    if (props) {
      for (let [ key, value ] of Object.entries(props)) {
        if (value) {
          if (key === 'className') {
              key = 'class';
          }
          html += ` ${key}="${escape(value)}"`;
        }
      }
    }
    html += '>';
    if (!isVoid[type]) {
      if (children) {
        html += this.mergeElements(children);
      }
      html += `</${type}>`;
    }
    return new String(html);
  }

  mergeElements(elements) {
    const content = [];
    if (!(elements instanceof Array)) {
      elements = [ elements ];
    }
    for (let element of elements) {
      if (typeof(element) === 'string') {
        element = escape(element);
      }
      content.push(element);
    }
    return content.join('');
  }

  render(tokens) {
    const elements = this.renderTokens(tokens);
    return this.mergeElements(elements);
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
