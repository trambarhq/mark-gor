import { inline } from './rules.mjs';
import { merge, escape, findClosingBracket } from './helpers.mjs';
import { defaults } from './defaults.mjs';

class InlineLexer {
  constructor(options, extra) {
    this.inLink = false;
    this.links = {};
    this.remaining = '';
    this.offset = 0;
    this.options = defaults;
    this.rules = inline.normal;

    if (options) {
      this.options = merge({}, defaults, options);
    }
    if (this.options.pedantic) {
      this.rules = inline.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    }
    if (extra) {
      merge(this, extra);
    }
  }

  capture(name) {
    const regExp = this.rules[name]
    const cap = regExp.exec(this.remaining);
    if (cap) {
      const len = cap[0].length;
      this.remaining = this.remaining.substr(len);
      this.offset += len;
      return cap;
    }
  }

  backpedal(text) {
    this.remaining = text + this.remaining;
    this.offset -= text.length;
  }

  findRefLink(name) {
    const link = this.links[name];
    if (link && link.href) {
      return link;
    }
  }

  tokenize(text) {
    this.input = this.remaining = text;
    this.offset = 0;

    const tokens = [];
    let prevToken = null;
    while (this.remaining) {
      const token = this.captureToken();
      if (token.type === 'text') {
        // merge adjacent text tokens
        if (prevToken && prevToken.type === 'text') {
          prevToken.text += token.text;
          continue;
        }
      } else if (token.markdown) {
        // process children
        const extra = (token.type === 'link') ? { inLink: true } : {};
        const lexer = new InlineLexer(this.options, extra);
        token.children = lexer.tokenize(token.markdown);
      }
      tokens.push(token);
      prevToken = token;
    }
    return tokens;
  }

  captureToken() {
    const token = this.captureEscape()
        || this.captureTag()
        || this.captureLink()
        || this.captureRefLink('reflink')
        || this.captureRefLink('nolink')
        || this.captureStrong()
        || this.captureEmphasized()
        || this.captureCode()
        || this.captureLineBreak()
        || this.captureDeleted()
        || this.captureAutolink()
        || this.captureUrl()
        || this.captureText();
    if (!token) {
      if (this.remaining) {
        throw new Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
      }
    }
    return token;
  }

  captureEscape() {
    const cap = this.capture('escape');
    if (cap) {
      const type = 'text';
      const escaped = true;
      const text = cap[1];
      return { type, escaped, text };
    }
  }

  captureAutolink() {
    const cap = this.capture('autolink');
    if (cap) {
      const type = 'autolink';
      const text = escape(cap[1]);
      const href = (cap[2] === '@') ? href = `mailto:${text}` : text;
      return { type, href, text };
    }
  }

  captureUrl() {
    if (this.inLink) {
      return;
    }
    const cap = this.capture('url');
    if (cap) {
      const type = 'url';
      if (cap[2] === '@') {
          const text = escape(cap[0]);
          const href = `mailto:${text}`;
          return { type, href, text };
      } else {
        // do extended autolink path validation
        let capZero = cap[0], prevCapZero;
        do {
          prevCapZero = capZero;
          capZero = this.rules._backpedal.exec(capZero)[0];
        } while (prevCapZero !== capZero);
        if (cap[0].length !== capZero.length) {
          this.backpedal(cap[0].substr(capZero.length));
        }
        const text = escape(capZero);
        const href = (cap[1] === 'www.') ? `http://${text}` : text;
        return { type, href, text };
      }
    }
  }

  captureTag() {
    const cap = this.capture('tag');
    if (cap) {
      const type = 'html';
      const html = cap[0];
      if (!this.inLink && /^<a /i.test(html)) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(html)) {
        this.inLink = false;
      }
      return { type, html };
    }
  }

  captureLink() {
    const cap = this.capture('link');
    if (cap) {
      const type = (cap[0].charAt(0) === '!') ? 'image' : 'link';
      let href = cap[2];
      let title = cap[3];
      const lastParenIndex = findClosingBracket(href, '()');
      if (lastParenIndex > -1) {
        const start = (type === 'image') ? 5 : 4;
        const linkLen = start + cap[1].length + lastParenIndex;
        href = href.substring(0, lastParenIndex);
        title = '';
        const capZero = cap[0].substring(0, linkLen).trim();
        this.backpedal(cap[0].substr(capZero.length));
      }
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = title ? title.slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      if (type === 'image') {
        const text = cap[1];
        return { type, href, title, text };
      } else {
        const markdown = cap[1];
        const children = null;
        return { type, href, title, markdown, children };
      }
    }
  };

  captureRefLink(rule) {
    const cap = this.capture(rule);
    if (cap) {
      const type = (cap[0].charAt(0) === '!') ? 'image' : 'link';
      const ref = (cap[2] || cap[1])
                  .replace(/\s+/g, ' ')
                  .toLowerCase();
      const link = this.findRefLink(ref);
      if (link) {
        const { href, title } = link;
        if (type === 'image') {
          const text = cap[1];
          return { type, ref, href, title, text };
        } else {
          const markdown = cap[1];
          const children = null;
          return { type, ref, href, title, markdown, children };
        }
      } else {
        this.backpedal(cap[0].substr(1));

        const type = 'text';
        const text = cap[0].substr(0, 1);
        return { type, text };
      }
    }
  }

  captureStrong() {
    const cap = this.capture('strong');
    if (cap) {
      const type = 'strong';
      const variant = cap[0].charAt(0);
      const markdown = cap[4] || cap[3] || cap[2] || cap[1];
      const children = null;
      return { type, variant, markdown, children };
    }
  }

  captureEmphasized() {
    const cap = this.capture('em');
    if (cap) {
      const type = 'em';
      const variant = cap[0].charAt(0);
      const markdown = cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1];
      const children = null;
      return { type, variant, markdown, children };
    }
  }

  captureCode() {
    const cap = this.capture('code');
    if (cap) {
      const type = 'codespan';
      const text = cap[2];
      return { type, text };
    }
  }

  captureLineBreak() {
    const cap = this.capture('br');
    if (cap) {
      const type = 'br';
      return { type };
    }
  }

  captureDeleted() {
    const cap = this.capture('del');
    if (cap) {
      const type = 'del';
      const markdown = cap[1];
      const children = null;
      return { type, markdown, children };
    }
  }

  captureText() {
    const cap = this.capture('text');
    if (cap) {
      const type = 'text';
      const text = cap[0];
      return { type, text };
    }
  }
}

export {
  InlineLexer,
  InlineLexer as default,
};
