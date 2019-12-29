import { inline } from './rules.mjs';
import { merge, escape, unescape, findClosingBracket } from './helpers.mjs';
import { defaults } from './defaults.mjs';
import { decodeEntities } from './html-entities.mjs';
import { isVoidElement, isTerminatingElement, isExpectedContent, getImplicitElements } from './html-tag-attrs.mjs';

class InlineLexer {
  constructor(options, props) {
    this.states = [];
    this.inLink = false;
    this.inMarkdownLink = false;
    this.inRawBlock = false;
    this.links = {};
    this.remaining = '';
    this.offset = 0;
    this.options = defaults;
    this.rules = inline.normal;
    this.tokens = [];

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
    if (props) {
      merge(this, props);
    }
  }

  tokenize(text) {
    this.initialize(text);
    while (this.remaining) {
      const token = this.captureToken();
      this.append(token);
    }
    this.finalize();
    return this.tokens;
  }

  initialize(text) {
    this.input = this.remaining = text;
    this.offset = 0;
    this.tokens = [];
  }

  finalize() {
    if (this.options.cleanHtml) {
      this.mergeHtmlTags();
    }
  }

  pushState() {
    this.states.push({
      input: this.input,
      remaining: this.remaining,
      offset: this.offset,
      tokens: this.tokens,
      inMarkdownLink: this.inMarkdownLink,
    });
  }

  popState() {
    const state = this.states.pop();
    this.input = state.input;
    this.remaining = state.remaining;
    this.offset = state.offset;
    this.tokens = state.tokens;
    this.inMarkdownLink = state.inMarkdownLink;
  }

  append(token) {
    if (token.type === 'text') {
      // merge adjacent text tokens
      const prevToken = this.tokens[this.tokens.length - 1];
      if (prevToken && prevToken.type === 'text') {
        prevToken.text += token.text;
        return;
      }
    } else if (token.type === 'br') {
      // don't put line-break after HTML tags
      const prevToken = this.tokens[this.tokens.length - 1];
      if (prevToken && prevToken.type === 'html_tag') {
        return;
      }
    }
    if (token.markdown) {
      // process children
      this.pushState();
      this.inMarkdownLink = (token.type === 'link');
      token.children = this.tokenize(token.markdown);
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
      this.offset += len;
      return cap;
    }
  }

  backpedal(text) {
    this.remaining = text + this.remaining;
    this.offset -= text.length;
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
      const text = cap[1];
      const url = escape(text);
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
          const url = escape(text);
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
        const url = escape(text);
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
      let tagType;
      let tagName;
      const tcap = /^<(\/?)([a-zA-Z][\w:-]*)/.exec(html);
      if (tcap) {
        tagType = (tcap[1]) ? 'close' : 'open';
        tagName = tcap[2].toLowerCase();
      }
      const children = null;
      if (!this.inLink && tagType === 'open' && tagName === 'a') {
        this.inLink = true;
      } else if (this.inLink && tagType === 'close' && tagName === 'a') {
        this.inLink = false;
      }
      if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = true;
      } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = false;
      }
      return { type, tagType, tagName, html, children };
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
        title = undefined;
        const capZero = cap[0].substring(0, linkLen).trim();
        this.backpedal(cap[0].substr(capZero.length));
      }
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        }
      } else if (title) {
        title = title.slice(1, -1);
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
      const text = cap[2].trim();
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
      if (!this.inRawBlock) {
        const type = 'text';
        const text = this.decodeEntities(cap[0]);
        return { type, text };
      } else {
        const type = 'raw';
        const html = cap[0];
        return { type, html };
      }
    }
  }

  decodeEntities(html) {
    return decodeEntities(html);
  }

  mergeHtmlTags() {
    const stack = [];
    let index = 0;
    for (;;) {
      const token = this.tokens[index];
      let newDepth = -1;
      if (token) {
        if (token.type == 'html_tag') {
          const { tagType, tagName } = token;
          if (tagType === 'open') {
            // see if the tag closes an element that permits end-tag to be
            // omitted
            for (let i = stack.length - 1; i >= 0; i--) {
              const openTag = stack[i];
              if (isTerminatingElement(tagName, openTag.tagName)) {
                newDepth = i;
                break;
              } else if(isExpectedContent(tagName, openTag.tagName)) {
                break;
              }
            }
            // check if tag is void (no closing tag)
            if (isVoidElement(tagName)) {
              token.tagType = 'void';
            } else if (newDepth === -1) {
              stack.push(token);
            }
            if (newDepth === -1) {
              index++;
            }
          } else if (tagType === 'close') {
            // see if the end tag closes an element in the stack
            for (let i = stack.length - 1; i >= 0; i--) {
              const openTag = stack[i];
              if (tagName === openTag.tagName) {
                newDepth = i;
                break;
              }
            }
            // toss the end tag
            this.tokens.splice(index, 1);
          } else {
            // skip over other tag type
            index++;
          }
        } else {
          // skip over tokens that aren't HTML tags
          index++;
        }
      } else {
        if (stack.length > 0) {
          // we're out of tokens--pop everything
          newDepth = 0;
        } else {
          break;
        }
      }
      if (newDepth !== -1) {
        // pop elements off the stack, insert children into them, and
        // marked them as container
        while (stack.length > newDepth) {
          const openTag = stack.pop();
          const openTagIndex = this.tokens.indexOf(openTag);
          const startIndex = openTagIndex + 1;
          const children = this.tokens.splice(startIndex, index - startIndex);
          this.createImplicitHtmlTags(openTag.tagName, children);
          openTag.tagType = 'parent';
          openTag.children = children;
          index = openTagIndex + 1;
        }
      }
    }
  }

  createImplicitHtmlTags(tagName, children) {
    const implicitTagNames = getImplicitElements(tagName);
    if (!implicitTagNames) {
      return;
    }
    let index = 0;
    const created = {};
    while (index < children.length) {
      const child = children[index];
      if (child.type === 'html_tag') {
        const implicitTagName = implicitTagNames[child.tagName];
        if (implicitTagName) {
          // remove the child and place it in the implicit element instead
          // (e.g. tr goes into tbody)
          children.splice(index, 1);
          let container = created[implicitTagName];
          if (!container) {
            container = {
              type: 'html_tag',
              tagType: 'parent',
              tagName: implicitTagName,
              html: `<${implicitTagName}>`,
              children: [],
            };
            children.splice(index, 0, container);
            created[implicitTagName] = container;
            index++;
          }
          container.children.push(child);
        } else {
          index++;

          // remove the implicitly created one if there's an explicit one
          if (created[child.tagName]) {
            created[child.tagName] = undefined;
          }
        }
      } else {
        index++;
      }
    }
  }
}

export {
  InlineLexer,
  InlineLexer as default,
};
