import { escape } from './helpers.mjs';
import { BaseRenderer } from './base-renderer.mjs';

class HtmlRenderer extends BaseRenderer {
  createElement(type, props, children) {
    let html = `<${type}`;
    if (props) {
      for (let [ key, value ] of Object.entries(props)) {
        if (value !== undefined) {
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
        element = escape(element, true);
      }
      content.push(element);
    }
    return content.join('');
  }

  render(tokens) {
    this.initialize();
    const elements = this.renderTokens(tokens);
    return this.mergeElements(elements);
  }

  renderHtmlTag(token) {
    const { tagType, tagName, html, children, textContent } = token;
    if (tagType === 'closed') {
      let content;
      if (textContent) {
        content = this.sanitize(textContent);
      } else if (children) {
        const elements = this.renderTokens(children);
        content = this.mergeElements(elements);
      }
      if (content) {
        const startTag = this.sanitize(html);
        const endTag = this.sanitize(`</${tagName}>`);
        return new String(startTag + content + endTag);
      }
    }
    return this.sanitize(html);
  }

  renderRaw(token) {
    const { html } = token;
    return this.sanitize(html);
  }

  packageCode(highlighted) {
    return new String(highlighted);
  }

  sanitize(html) {
    const { sanitize, sanitizer } = this.options;
    if (sanitize) {
      html = (sanitizer) ? sanitizer(html) : escape(html);
    }
    return new String(html);
  }
}

const isVoid = {
  br: true,
  hr: true,
  img: true,
  input: true,
};

export {
  HtmlRenderer,
  HtmlRenderer as default,
};
