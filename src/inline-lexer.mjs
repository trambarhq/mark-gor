import { inline } from './rules.mjs';
import { escape, findClosingBracket } from './helpers.mjs';
import { mergeDefaults } from './defaults.mjs';
import { decodeHtmlEntities } from './html-entities.mjs';

class InlineLexer {
  constructor(options, props) {
    this.states = [];
    this.inLink = false;
    this.inMarkdownLink = false;
    this.inRawBlock = false;
    this.inScriptBlock = false;
    this.inHtmlBlock = false;
    this.links = {};
    this.remaining = '';
    this.options = mergeDefaults(options);
    this.rules = inline.normal;
    this.tokens = [];

    if (this.options.pedantic) {
      this.rules = inline.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    }
    this.captureFunctions = [
      this.captureEscape,
      this.captureTag,
      this.captureLink,
      this.captureRefLink,
      this.captureNoLink,
      this.captureStrong,
      this.captureEmphasized,
      this.captureCode,
      this.captureLineBreak,
      this.captureDeleted,
      this.captureAutolink,
      this.captureUrl,
      this.captureBrokenTag,
      this.captureText,
    ];
    this.htmlCaptureFunctions = [
      this.captureTag,
      this.captureBrokenTag,
      this.captureText,
    ];

    Object.assign(this, props);
  }

  tokenize(text, containerType) {
    const inHtmlBlock = (containerType === 'html_block');
    const inRawBlock = false;
    this.initialize(text, { inHtmlBlock, inRawBlock });
    this.process();
    this.finalize();
    return this.tokens;
  }

  initialize(text, props) {
    this.input = this.remaining = text;
    this.tokens = [];
    Object.assign(this, props);
  }

  process() {
    while (this.remaining) {
      const token = this.captureToken();
      this.append(token);
    }
  }

  finalize() {
  }

  pushState() {
    this.states.push({
      input: this.input,
      remaining: this.remaining,
      tokens: this.tokens,
      inMarkdownLink: this.inMarkdownLink,
    });
  }

  popState() {
    const state = this.states.pop();
    this.input = state.input;
    this.remaining = state.remaining;
    this.tokens = state.tokens;
    this.inMarkdownLink = state.inMarkdownLink;
  }

  append(token) {
    if (!token) {
      return;
    }
    if (token.type === 'text') {
      // merge adjacent text tokens
      const prevToken = this.tokens[this.tokens.length - 1];
      if (prevToken && prevToken.type === 'text') {
        prevToken.text += token.text;
        prevToken.html += token.html;
        return;
      }
    }
    if (token.markdown) {
      // process children
      const inMarkdownLink = (token.type === 'link');
      this.pushState();
      this.initialize(token.markdown, { inMarkdownLink });
      this.process();
      this.finalize();
      token.children = this.tokens;
      this.popState();
    }
    this.tokens.push(token);
  }

  capture(name) {
    const regExp = this.rules[name]
    const cap = regExp.exec(this.remaining);
    if (cap) {
      const len = cap[0].length;
      this.remaining = this.remaining.substr(len);
      return cap;
    }
  }

  backpedal(text) {
    this.remaining = text + this.remaining;
  }

  findRefLink(name) {
    if (this.links.hasOwnProperty(name)) {
      const link = this.links[name];
      if (link.href) {
        return link;
      }
    }
  }

  captureToken() {
    // only scan for tag and text when we're in a HTML or raw block
    const functions = (this.inHtmlBlock || this.inRawBlock)
                    ? this.htmlCaptureFunctions
                    : this.captureFunctions;
    for (let f of functions) {
      const token = f.call(this);
      if (token !== undefined) {
        return token;
      }
    }
    if (this.remaining) {
      throw new Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
    }
  }

  captureEscape() {
    const cap = this.capture('escape');
    if (cap) {
      const type = 'text';
      const text = cap[1];
      const html = escape(text);
      return { type, text, html };
    }
  }

  captureAutolink() {
    const cap = this.capture('autolink');
    if (cap) {
      const type = 'autolink';
      const text = cap[1];
      const url = text;
      const href = (cap[2] === '@') ? `mailto:${url}` : url;
      return { type, href, text };
    }
  }

  captureUrl() {
    if (this.inLink || this.inMarkdownLink) {
      return;
    }
    const cap = this.capture('url');
    if (cap) {
      const type = 'url';
      if (cap[2] === '@') {
        const text = cap[0];
        const url = text;
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
        const text = capZero;
        const url = text;
        const href = (cap[1] === 'www.') ? `http://${url}` : url;
        return { type, href, text };
      }
    }
  }

  captureTag() {
    const cap = this.capture('tag');
    if (cap) {
      const type = 'html_tag';
      const html = cap[0];
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      if (!this.inRawBlock && /^<(pre|code|kbd|script|style)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = true;
        this.inScriptBlock = /^<(script|style)/i.test(cap[0]);
      } else if (this.inRawBlock && /^<\/(pre|code|kbd|script|style)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = false;
        this.inScriptBlock = false;
      }
      return { type, html };
    }
  }

  captureLink() {
    const cap = this.capture('link');
    if (cap) {
      const type = (cap[0].charAt(0) === '!') ? 'image' : 'link';
      let hrefHtml = cap[2];
      let titleHtml = cap[3];
      const lastParenIndex = findClosingBracket(hrefHtml, '()');
      if (lastParenIndex > -1) {
        const start = (type === 'image') ? 5 : 4;
        const linkLen = start + cap[1].length + lastParenIndex;
        hrefHtml = hrefHtml.substring(0, lastParenIndex);
        titleHtml = undefined;
        const capZero = cap[0].substring(0, linkLen).trim();
        this.backpedal(cap[0].substr(capZero.length));
      }
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(hrefHtml);

        if (link) {
          hrefHtml = link[1];
          titleHtml = link[3];
        }
      } else if (titleHtml) {
        titleHtml = titleHtml.slice(1, -1);
      }
      hrefHtml = hrefHtml.trim().replace(/^<([\s\S]*)>$/, '$1');
      hrefHtml = this.unescapeSlashes(hrefHtml);
      titleHtml = this.unescapeSlashes(titleHtml);
      const title = this.decodeEntities(titleHtml);
      const href = this.decodeEntities(hrefHtml);
      if (type === 'image') {
        const text = cap[1];
        return { type, href, hrefHtml, title, titleHtml, text };
      } else {
        const markdown = cap[1];
        const children = null;
        return { type, href, hrefHtml, title, titleHtml, markdown, children };
      }
    }
  }

  captureNoLink() {
    return this.captureRefLink('nolink');
  }

  captureRefLink(rule) {
    const cap = this.capture(rule || 'reflink');
    if (cap) {
      const type = (cap[0].charAt(0) === '!') ? 'image' : 'link';
      const ref = (cap[2] || cap[1])
                  .replace(/\s+/g, ' ')
                  .toLowerCase();
      const link = this.findRefLink(ref);
      if (link) {
        const { href, hrefHtml, title, titleHtml } = link;
        if (type === 'image') {
          const text = cap[1];
          return { type, ref, href, hrefHtml, title, titleHtml, text };
        } else {
          const markdown = cap[1];
          const children = null;
          return { type, ref, href, hrefHtml, title, titleHtml, markdown, children };
        }
      } else {
        this.backpedal(cap[0].substr(1));

        const type = 'text';
        const html = cap[0].substr(0, 1);
        const text = html;
        return { type, text, html };
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
      const text = cap[2].trim();
      return { type, text };
    }
  }

  captureLineBreak() {
    const cap = this.capture('br');
    if (cap) {
      if (this.inHtmlBlock) {
        // don't add <BR> tag when we're in a HTML block
        const type = 'text';
        const text = cap[0];
        const html = text;
        return { type, text, html };
      } else {
        const type = 'br';
        return { type };
      }
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
      if (!this.inScriptBlock) {
        const type = 'text';
        const html = this.transformText(cap[0]);
        const text = this.decodeEntities(html);
        return { type, text, html };
      } else {
        const type = 'raw';
        const html = cap[0];
        return { type, html };
      }
    }
  }

  unescapeSlashes(text) {
    if (text) {
      return text.replace(this.rules._escapes, '$1');
    }
    return text;
  }

  decodeEntities(html) {
    return decodeHtmlEntities(html);
  }

  transformText(text) {
    const { smartypants } = this.options;
    if (smartypants && !this.inRawBlock) {
      return text
        // em-dashes
        .replace(/---/g, '\u2014')
        // en-dashes
        .replace(/--/g, '\u2013')
        // opening singles
        .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
        // closing singles & apostrophes
        .replace(/'/g, '\u2019')
        // opening doubles
        .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
        // closing doubles
        .replace(/"/g, '\u201d')
        // ellipses
        .replace(/\.{3}/g, '\u2026');
    }
    return text;
  }

  captureBrokenTag() {
    if (!this.options.fixBrokenTags) {
      return;
    }
    const cap = /^<(img|a)\s+(.*?)(\/?)>/i.exec(this.remaining);
    if (cap) {
      const tagName = cap[1];
      const attrs = cap[2];
      const attrsFixed = attrs
        // fix missing space between attributes
        .replace(/\b(\w+)\s*=\s*"([^"]*)"(?=\S)/gi, `$1="$2" `)
        .replace(/\b(\w+)\s*=\s*'([^"]*)'(?=\S)/gi, `$1='$2' `)
        // fix missing closing quote
        .replace(/\b(\w+)\s*=\s*"([^"]*)$/i, `$1="$2"`)
        .replace(/\b(\w+)\s*=\s*'([^']*)$/i, `$1='$2'`)
        // fix missing opening quote
        .replace(/\b(\w+)\s*=\s*([^'"]+)"/i, `$1="$2"`)
        .replace(/\b(\w+)\s*=\s*([^'"]+)'/i, `$1='$2'`)
        // fix missing quotes
        .replace(/\b(\w+)\s*=\s*([^'"]+)$/i, `$1="$2"`)
      const tagFixed = `<${tagName} ${attrsFixed}>`;
      if (tagFixed !== cap[0]) {
        const rollback = this.remaining;
        this.remaining = tagFixed + this.remaining.substr(cap[0].length);
        const token = this.captureTag();
        if (token) {
          return token;
        } else {
          this.remaining = rollback;
        }
      }
    }
  }
}

export {
  InlineLexer,
  InlineLexer as default,
};
