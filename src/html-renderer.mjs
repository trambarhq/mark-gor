import { escape } from './helpers.mjs';
import { BaseRenderer } from './base-renderer.mjs';
import { isVoidElement } from './html-tag-attrs.mjs';

class HtmlRenderer extends BaseRenderer {
  createElement(type, props, children, options) {
    let html = `<${type}`;
    if (props) {
      for (let [ key, value ] of Object.entries(props)) {
        if (key === 'className') {
          key = 'class';
        } else if (key === 'defaultChecked') {
          key = 'checked';
        }
        if (typeof(value) === 'string') {
          if (key === 'src') {
            // do nothing
          } else if (key === 'href') {
            value = escape(value);
          } else {
            value = escape(value, true);
          }
        } else if (typeof(value) === 'boolean') {
          value = (value) ? '' : undefined;
        }
        if (value != undefined) {
          html += ` ${key}="${value}"`;
        }
      }
    }
    const isVoid = isVoidElement(type);
    html += (isVoid && this.options.xhtml) ? '/>': '>';
    if (!isVoid) {
      // add linefeed before content
      if (options && options.before) {
        if (!this.options.omitLinefeed) {
          html += options.before;
        }
      }

      if (children) {
        html += this.mergeElements(children);
      }
      html += `</${type}>`;
    }
    // add linefeed after tag
    if (options && options.after) {
      if (!this.options.omitLinefeed) {
        html += options.after;
      }
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
    const { html } = token;
    if (this.options.omitComment) {
      if (/<!--/.test(html)) {
        return;
      }
    }
    return this.sanitize(html);
  }

  renderText(token) {
    if (!this.options.decodeEntities) {
      return this.boxRawHtml(escape(token.html));
    }
    return super.renderText(token);
  }

  renderLink(token) {
    if (!this.options.decodeEntities) {
      const { href, titleHtml } = token;
      const children = this.renderChildren(token);
      const url = this.cleanUrl(href);
      if (url === null) {
        return children;
      }
      const title = this.boxRawHtml(escape(titleHtml));
      return this.createElement('a', { href: url, title }, children);
    }
    return super.renderLink(token);
  }

  renderImage(token) {
    if (!this.options.decodeEntities) {
      const { href, titleHtml, text } = token;
      const url = this.cleanUrl(href);
      if (url === null) {
        return text;
      }
      const title = this.boxRawHtml(escape(titleHtml));
      return this.createElement('img', { src: url, alt: text, title });
    }
    return super.renderImage(token);
  }

  renderRaw(token) {
    const { html } = token;
    return this.sanitize(html);
  }

  boxRawHtml(html) {
    if (html) {
      return new String(html);
    }
    return html;
  }

  packageCode(highlighted) {
    return this.boxRawHtml(highlighted);
  }

  cleanUrl(url) {
    if (url && this.options.mangle) {
      if (url.startsWith('mailto:')) {
        const address = url.substr(7);
        const mangled = this.mangle(address);
        return this.boxRawHtml(`mailto:${mangled}`);
      }
    }
    return super.cleanUrl(url);
  }

  sanitize(html) {
    const { sanitize, sanitizer } = this.options;
    if (sanitize) {
      html = (sanitizer) ? sanitizer(html) : escape(html);
    }
    return new String(html);
  }

  mangle(text) {
    let mangled = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        mangled += `&#x${ch.toString(16)}`;
      } else {
        mangled += `&#${ch}`;
      }
    }
    return mangled;
  }
}

export {
  HtmlRenderer,
  HtmlRenderer as default,
};
