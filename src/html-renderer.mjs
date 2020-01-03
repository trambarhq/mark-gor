import { escape } from './helpers.mjs';
import { BaseRenderer } from './base-renderer.mjs';
import { isVoidElement } from './html-tag-attrs.mjs';

class HtmlRenderer extends BaseRenderer {
  createElement(type, props, children, options) {
    let html = `<${type}`;
    if (props) {
      for (let [ key, value ] of Object.entries(props)) {
        if (value !== undefined) {
          if (key === 'className') {
              key = 'class';
          }
          if (key !== 'src') {
            value = escape(value);
          }
          html += ` ${key}="${value}"`;
        }
      }
    }
    html += '>';
    if (!isVoidElement(type)) {
      // add linefeed before content
      if (options && options.before) {
        html += options.before;
      }

      if (children) {
        html += this.mergeElements(children);
      }
      html += `</${type}>`;
    }
    // add linefeed after tag
    if (options && options.after) {
      html += options.after;
    }
    return new String(html);
  }

  mergeElements(elements) {
    const { decodeEntities } = this.options;
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
    const { html } = token;
    return this.sanitize(html);
  }

  renderText(token) {
    const { decodeEntities } = this.options;
    if (decodeEntities) {
      return token.text;
    } else {
      return new String(escape(token.html));
    }
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

export {
  HtmlRenderer,
  HtmlRenderer as default,
};
