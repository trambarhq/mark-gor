import { escape } from './helpers.mjs';
import { BaseRenderer } from './base-renderer.mjs';

class HTMLRenderer extends BaseRenderer {
  constructor(options, props) {
    super(options, props);

    this.outputFunctions = {
      html_tag: this.outputHTMLTag,
      html_element: this.outputHTMLElement,
      html_element_end: this.outputHTMLElementEnd,
      text: this.outputText,
      raw: this.outputRaw,
    };
  }

  output() {
    return this.outputTokens(this.tokens);
  }

  outputTokens(tokens) {
    const list = [];
    if (tokens) {
      for (let token of tokens) {
        const output = this.outputToken(token);
        if (output) {
          list.push(output);
        }
      }
    }
    return list.join('');
  }

  outputToken(token) {
    const f = this.outputFunctions[token.type];
    if (f) {
      return f.call(this, token);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Unknown tag type: ${token.type}`);
      }
    }
  }

  outputHTMLTag(token) {
    const { html } = token;
    if (this.options.omitDeclarations) {
      if (/^\s*<!/.test(html)) {
        return '';
      }
    }
    if (this.options.omitEmbeddedCode) {
      if (/^\s*<\?/.test(html)) {
        return '';
      }
    }
    return this.sanitize(html);
  }

  outputHTMLElement(token) {
    if (this.shouldOmit(token)) {
      return;
    }
    const { tagName, attributes, children } = token;
    const tag = this.getTagProperties(tagName);
    let html = `<${tagName}`;
    if (attributes) {
      for (let [ key, value ] of Object.entries(attributes)) {
        if (typeof(value) === 'string') {
          value = escape(value, true);
        } else if (typeof(value) === 'boolean') {
          value = (value) ? '' : undefined;
        }
        if (value != undefined) {
          html += ` ${key}="${value}"`;
        }
      }
    }
    if (tag.void && this.options.xhtml) {
      html += '/>';
    } else {
      html += '>';
    }
    if (!tag.void && this.options.normalizeTags) {
      html += this.outputTokens(children);
      html += `</${tagName}>`;
    }
    return html;
  }

  outputHTMLElementEnd(token) {
    const { tagName } = token;
    return `</${tagName}>`;
  }

  outputText(token) {
    const { text, html } = token;
    if (this.options.decodeEntities || html === undefined) {
      return escape(text, true);
    } else {
      return escape(html);
    }
  }

  outputRaw(token) {
    const { html, highlighted } = token;
    if (highlighted) {
      return highlighted;
    } else {
      return this.sanitize(html);
    }
  }

  renderLink(token) {
    if (!this.options.decodeEntities) {
      const { hrefHTML, titleHTML } = token;
      const hrefCleaned = this.cleanUrl(hrefHTML, true, false);
      if (hrefCleaned !== null) {
        const href = this.boxAttribute(hrefCleaned, true);
        const title = this.boxAttribute(titleHTML, true);
        this.addElement('a', { href, title });
      }
      this.renderTokens(token.children);
      if (hrefCleaned !== null) {
        this.endElement('a');
      }
    } else {
      super.renderLink(token);
    }
  }

  renderImage(token) {
    if (!this.options.decodeEntities) {
      const { hrefHTML, titleHTML, text: alt } = token;
      const srcHTML = this.cleanUrl(hrefHTML, true, false);
      if (srcHTML !== null) {
        const title = this.boxAttribute(titleHTML, true);
        const src = this.boxAttribute(srcHTML, false);
        this.addElement('img', { src, alt, title });
      } else {
        this.addText(alt);
      }
    } else {
      super.renderImage(token);
    }
  }

  cleanUrl(url, escaped, unescapeAfter) {
    if (url && this.options.mangle) {
      if (url.startsWith('mailto:')) {
        const address = url.substr(7);
        const mangled = this.mangle(address);
        return this.boxRawHTML(`mailto:${mangled}`);
      }
    }
    return super.cleanUrl(url, escaped, unescapeAfter);
  }

  sanitize(html) {
    const { sanitize, sanitizer } = this.options;
    if (sanitize) {
      html = (sanitizer) ? sanitizer(html) : escape(html);
    }
    return html;
  }

  boxAttribute(text, needEscaping) {
    if (text) {
      if (needEscaping) {
        text = escape(text);
      }
      return new String(text);
    }
    return text;
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
  HTMLRenderer,
  HTMLRenderer as HtmlRenderer,
};
