import { cleanUrl, escape, unescape } from './helpers.mjs';
import { mergeDefaults } from './defaults.mjs';
import { SluggerMarked } from './slugger.mjs';
import { decodeHtmlEntities } from './html-entities.mjs';
import {
  voidCheck,
  terminationChecks,
  expectedContentChecks,
  vivificationCheck,
  textStyleCheck,
  blockCheck,
  styleClearanceCheck,
  contentEvictionCheck,
  linefeedEliminationCheck,
  implicitElements,
} from './html-tag-attrs.mjs';

class BaseRenderer {
  constructor(options, props) {
    this.options = mergeDefaults(options);
    this.slugger = null;
    if (typeof(this.options.headerIds) === 'string') {
    } else {
      this.sluggerClass = SluggerMarked;
    }

    this.renderFunctions = {
      text: this.renderText,
      text_block: this.renderTextBlock,
      space: this.renderSpace,
      strong: this.renderStrong,
      em: this.renderEmphasized,
      codespan: this.renderCodeSpan,
      del: this.renderDeleted,
      br: this.renderLineBreak,
      link: this.renderLink,
      autolink: this.renderAutolink,
      url: this.renderUrl,
      image: this.renderImage,
      html_block: this.renderHtmlBlock,
      paragraph: this.renderParagraph,
      code: this.renderCode,
      blockquote: this.renderBlockquote,
      html_tag: this.renderHtmlTag,
      heading: this.renderHeading,
      hr: this.renderHorizontalRule,
      list: this.renderList,
      list_item: this.renderListItem,
      loose_item: this.renderLooseItem,
      table: this.renderTable,
      table_header: this.renderTableHeader,
      table_row: this.renderTableRow,
      table_header_cell: this.renderTableHeaderCell,
      table_row_cell: this.renderTableRowCell,
      def: this.renderRefDefinition,
      raw: this.renderRaw,
    };
    Object.assign(this, props);
  }

  output() { /* abstract */ }

  initialize() {
    this.tokens = [];
    this.slugger = new this.sluggerClass(this.options.headerIds);
  }

  finalize() {
    const { normalizeTags } = this.options;
    if (normalizeTags) {
      this.normalize();
    }
  }

  addToken(token) {
    this.tokens.push(token);
  }

  addText(text) {
    const type = 'text';
    this.addToken({ type, text });
  }

  addLinefeed() {
    const { omitLinefeed } = this.options;
    if (!omitLinefeed) {
      this.addText('\n');
    }
  }

  addHighlighted(highlighted) {
    const type = 'raw';
    const html = highlighted;
    this.addToken({ type, html });
  }

  addElement(tagName, attributes) {
    const type = 'html_element';
    const children = null;
    this.addToken({ type, tagName, attributes, children });
  }

  endElement(tagName) {
    const type = 'html_element_end';
    this.addToken({ type, tagName });
  }

  render(tokens) {
    this.initialize();
    this.renderTokens(tokens);
    this.finalize();
    return this.output();
  }

  renderTokens(tokens) {
    if (tokens) {
      for (let token of tokens) {
        this.renderToken(token);
      }
    }
  }

  renderToken(token) {
    const f = this.renderFunctions[token.type];
    if (f) {
      return f.call(this, token);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Unrecognized token: ' + token.type)
      }
    }
  }

  renderInlineElement(token) {
    this.addElement(token.type, null);
    this.renderTokens(token.children);
    this.endElement(token.type);
  }

  renderCode(token) {
    const { text, lang, highlighted } = token;
    const { langPrefix } = this.options;
    const className = (lang) ? langPrefix + lang : undefined;
    this.addElement('pre', null);
    this.addElement('code', { class: className });
    if (highlighted) {
      this.addHighlighted(highlighted)
    } else {
      this.addText(text);
    }
    this.endElement('code');
    this.endElement('pre');
    if (lang) {
      this.addLinefeed();
    }
  }

  renderBlockquote(token) {
    this.addElement('blockquote');
    this.addLinefeed();
    this.renderTokens(token.children);
    this.endElement('blockquote');
    this.addLinefeed();
  }

  renderHtmlTag(token) {
    const { normalizeTags } = this.options;
    if (normalizeTags) {
      const { html } = token;
      const tag = this.parseHtmlTag(html);
      const { tagType, tagName, attributes, before, after } = tag;
      if (before) {
        this.addText(before);
      }
      if (tagType === 'start') {
        this.addElement(tagName, attributes);
      } else if (tagType === 'end') {
        this.endElement(tagName);
      }
      if (after) {
        this.addText(after);
      }
    } else {
      this.addToken(token);
    }
  }

  renderHeading(token) {
    const tagName = `h${token.depth}`;
    const id = this.generateHeadingId(token);
    this.addElement(tagName, { id });
    this.renderTokens(token.children);
    this.endElement(tagName);
    this.addLinefeed();
  }

  renderHorizontalRule(token) {
    this.addElement('hr');
    this.addLinefeed();
  }

  renderList(token) {
    const { ordered, first } = token;
    const type = (ordered) ? 'ol' : 'ul';
    const start = (first !== 1) ? first : undefined;
    this.addElement(type, { start });
    this.addLinefeed();
    this.renderTokens(token.children);
    this.endElement(type);
    this.addLinefeed();
  }

  renderListItem(token) {
    const { checked, loose } = token;
    this.addElement('li', null);
    if (checked !== undefined) {
      // put checkbox in front of content, inserting it before inline elements
      // if that's what follow; otherwise (i.e. the list item holds a block
      // element), insert it into a separate block
      const child = token.children[0];
      if (child && (child.type === 'text_block' || child.type === 'paragraph')) {
        if (child.type === 'paragraph') {
          this.addElement('p');
        }
        this.renderCheckbox(token);
        this.addText(' ');
        if (loose && !this.options.omitLinefeed) {
          this.addText(' ');
        }
        this.renderTokens(child.children);
        if (child.type === 'paragraph') {
          this.endElement('p');
          this.addLinefeed();
        }
        this.renderTokens(token.children.slice(1));
      } else {
        // put p tag around checkbox if item is loose
        if (loose) {
          this.addElement('p');
        }
        this.renderCheckbox(token);
        this.addText(' ');
        if (loose) {
          this.endElement('p');
          this.addLinefeed();
        }
        this.renderTokens(token.children);
      }
    } else {
      this.renderTokens(token.children);
    }
    this.endElement('li');
    this.addLinefeed();
  }

  renderLooseItem(token) {
    this.renderListItem(token);
  }

  renderCheckbox(token) {
    const { checked } = token;
    const disabled = true;
    const type = 'checkbox';
    this.addElement('input', { checked, disabled, type });
  }

  renderParagraph(token) {
    this.addElement('p');
    this.renderTokens(token.children);
    this.endElement('p');
    this.addLinefeed();
  }

  renderTable(token) {
    this.addElement('table');
    this.addLinefeed();
    this.renderTableHead(token);
    this.renderTableBody(token);
    this.endElement('table');
    this.addLinefeed();
  }

  renderTableHead(token) {
    const { children } = token;
    this.addElement('thead');
    this.addLinefeed();
    this.renderTokens(children.slice(0, 1));
    this.endElement('thead');
    this.addLinefeed();
  }

  renderTableBody(token) {
    const { children } = token;
    if (children.length > 1) {
      this.addElement('tbody');
      this.renderTokens(children.slice(1));
      this.endElement('tbody');
    }
  }

  renderTableRow(token) {
    this.addElement('tr');
    this.addLinefeed();
    this.renderTokens(token.children);
    this.endElement('tr');
    this.addLinefeed();
  }

  renderTableHeader(token) {
    this.renderTableRow(token);
  }

  renderTableHeaderCell(token) {
    const { align } = token;
    this.addElement('th', { align });
    this.renderTokens(token.children);
    this.endElement('th');
    this.addLinefeed();
  }

  renderTableRowCell(token) {
    const { align } = token;
    this.addElement('td', { align });
    this.renderTokens(token.children);
    this.endElement('td');
    this.addLinefeed();
  }

  renderStrong(token) {
    this.renderInlineElement(token);
  }

  renderEmphasized(token) {
    this.renderInlineElement(token);
  }

  renderCodeSpan(token) {
    const { text } = token;
    this.addElement('code');
    this.addText(text);
    this.endElement('code');
  }

  renderLineBreak(token) {
    this.addElement('br');
  }

  renderDeleted(token) {
    this.renderInlineElement(token);
  }

  renderUrl(token) {
    const { href: hrefUnescaped, text } = token;
    const href = this.cleanUrl(hrefUnescaped, false, true);
    if (href !== null) {
      this.addElement('a', { href });
    }
    this.addText(text);
    if (href !== null) {
      this.endElement('a');
    }
  }

  renderAutolink(token) {
    this.renderUrl(token);
  }

  renderLink(token) {
    const { hrefHtml, title } = token;
    const href = this.cleanUrl(hrefHtml, true, true);
    if (href !== null) {
      this.addElement('a', { href, title });
    }
    this.renderTokens(token.children);
    if (href !== null) {
      this.endElement('a');
    }
  }

  renderImage(token) {
    const { hrefHtml, title, text: alt } = token;
    const src = this.cleanUrl(hrefHtml, true, true);
    if (src !== null) {
      this.addElement('img', { src, alt, title });
    } else {
      this.addText(alt);
    }
  }

  renderText(token) {
    this.addToken(token);
  }

  renderHtmlBlock(token) {
    this.renderTokens(token.children);
  }

  renderTextBlock(token) {
    this.renderTokens(token.children);
  }

  renderRefDefinition(token) {
  }

  renderSpace(token) {
  }

  renderRaw(token) {
    this.addToken(token);
  }

  getPlainText(token) {
    const { text, html, children } = token;
    if (text) {
      return text;
    } else if (children) {
      const content = [];
      for (let child of children) {
        content.push(this.getPlainText(child));
      }
      return content.join('');
    } else {
      return '';
    }
  }

  getMarkedHeaderText(token) {
    const { text, html, children } = token;
    if (text) {
      // the Marked slugger expects text with HTML entities
      return html ? escape(html) : text;
    } else if (children) {
      const content = [];
      for (let child of children) {
        content.push(this.getMarkedHeaderText(child));
      }
      return content.join('');
    } else if (html) {
      // the Marked slugger expects to see HTML tags too
      return html;
    } else {
      return '';
    }
  }

  generateHeadingId(token) {
    const { headerIds, headerPrefix } = this.options;
    if (headerIds) {
      let plain;
      if (this.slugger instanceof SluggerMarked) {
        plain = this.getMarkedHeaderText(token)
        plain = unescape(plain);
      } else {
        plain = this.getPlainText(token);
      }
      name = this.slugger.slug(plain);
      return headerPrefix + name;
    }
  }

  cleanUrl(url, escaped, unescapeAfter) {
    const { sanitize, baseUrl } = this.options;
    if (!escaped) {
      // cleanUrl() expect the URL to be escaped
      url = escape(url);
    }
    let cleaned = cleanUrl(sanitize, baseUrl, url);
    if (unescapeAfter) {
      cleaned = this.decodeEntities(cleaned);
    }
    return cleaned;
  }

  shouldOmit(element) {
    const { tagName, attributes, children } = element;
    const omit = this.options.omitTags;
    if (omit instanceof Array) {
      if (omit.indexOf(tagName) !== -1) {
        return true;
      }
    } else if (omit instanceof Function) {
      return omit(tagName, attributes, children);
    }
  }

  normalize() {
    // push element onto stack when its start tag is encountered; pop it off
    // when its end tag is seen (when tags are properly paired up)
    const stack = [];
    let index = 0;
    for (;;) {
      let token = this.tokens[index];
      let newDepth = -1;
      let endTagPartner = null;
      let closureTagName = '';
      if (token) {
        if (token.type == 'html_element') {
          // see if the tag closes an element that permits omission of end-tag
          for (let i = stack.length - 1; i >= 0; i--) {
            if (this.isTerminatingElement(token.tagName, stack[i].tagName)) {
              newDepth = i;
              closureTagName = token.tagName;
              break;
            } else if(this.isExpectedContent(token.tagName, stack[i].tagName)) {
              // don't go further up the stack when the element is expected
              // (e.g. <li> in <ul>)
              break;
            }
          }
          if (newDepth === -1) {
            // don't push onto stack when element is void (e.g. <img>)
            if (!this.isVoidElement(token.tagName)) {
              stack.push(token);
            }
            index++;
          }
        } else if (token.type === 'html_element_end') {
          // see if the end tag closes an element in the stack
          for (let i = stack.length - 1; i >= 0; i--) {
            if (token.tagName === stack[i].tagName) {
              newDepth = i;
              endTagPartner = stack[i];
              break;
            }
          }
          if (newDepth !== -1 || !this.isVivificatingElement(token.tagName)) {
            // toss the end tag
            this.tokens.splice(index, 1);
          } else {
            // insert empty element to match browser behavior
            this.tokens[index] = {
              type: 'html_element',
              tagName: token.tagName,
              attributes: {},
              children: []
            };
            index++;
          }
        } else {
          // skip over tokens that aren't start or end tags
          index++;
        }
      } else {
        if (stack.length > 0) {
          // we're out of tokens--pop everything off the stack
          newDepth = 0;
        } else {
          break;
        }
      }
      if (newDepth !== -1) {
        for (let i = stack.length - 1; i >= newDepth; i--) {
          // when an inline element is being terminated, check if there
          // are any block element in the stack; terminate there if one
          // is found
          if (stack[i].tagName === 'a') {
            for (let j = i + 1; j < stack.length; j++) {
              if (this.isBlockElement(stack[j].tagName)) {
                token = stack[j];
                index = this.tokens.indexOf(token);
                stack.splice(j);
                closureTagName = token.tagName;
                endTagPartner = undefined;
                break;
              }
            }
          }
        }

        // pop elements off the stack and insert children into them,
        // keeping an eye out for text styling tags
        const styleTags = [];
        const newContext = stack[newDepth - 1];
        const restoreStyle = (newContext) ? !this.isEvictingElement(newContext.tagName) : true;
        while (stack.length > newDepth) {
          const openTag = stack.pop();
          if (restoreStyle) {
            if (openTag !== endTagPartner && openTag.tagName !== closureTagName) {
              // not the element explicitly targeted for closing
              // we might need to restore it later
              if (this.isStylingElement(openTag.tagName)) {
                styleTags.push({ ...openTag });
              }
            }
          }
          const openTagIndex = this.tokens.indexOf(openTag);
          const startIndex = openTagIndex + 1;
          openTag.children = this.tokens.splice(startIndex, index - startIndex);
          index = openTagIndex + 1;

          // create implicit elements
          this.createImplicitElements(openTag);

          // remove white-space
          this.removeExtraWhitespaces(openTag);

          // extract stray elements and place them in front of this one
          const evictions = this.evictStrayElements(openTag);
          for (let evicted of evictions) {
            this.tokens.splice(index - 1, 0, evicted);
            index++;
          }
        }

        for (let styleTag of styleTags) {
          // insert the styling tags where text content start again
          let insertionIndex = -1;
          let firstInlineIndex = -1;
          for (let i = index; i < this.tokens.length; i++) {
            const ahead = this.tokens[i];
            if (ahead.type === 'html_element') {
              // that is, unless we encounter a clearing table
              // <table> is the only one, I think
              if (this.isClearingElement(ahead.tagName)) {
                break;
              }
              // if the same tag is encountered then there's no need to restore
              if (styleTag.tagName === ahead.tagName) {
                break;
              }
              // remember where we first encountered an inline element
              if (firstInlineIndex === -1) {
                if (!this.isBlockElement(ahead.tagName)) {
                  firstInlineIndex = i;
                }
              }
            } else if (ahead.type === 'html_element_end') {
              if (styleTag.tagName === ahead.tagName) {
                break;
              }
            } else if (ahead.type === 'text') {
              // restore the style at the first inline element or right here
              if (firstInlineIndex !== -1) {
                insertionIndex = firstInlineIndex;
              } else {
                insertionIndex = i;
              }
              break;
            }
          }
          if (insertionIndex !== -1) {
            this.tokens.splice(insertionIndex, 0, styleTag);
          }
        }
      }
    }
  }

  createImplicitElements(element) {
    const { tagName, children } = element;
    const implicitTagNames = this.getImplicitElements(tagName);
    if (!implicitTagNames) {
      return;
    }
    let index = 0;
    let implicitTag = null;
    const newTags = [];
    while (index < children.length) {
      const child = children[index];
      if (child.type === 'html_element') {
        // see if the tag would implicit create its (absent) container
        const implicitTagName = implicitTagNames[child.tagName];
        if (implicitTag) {
          // see if the child would terminate the implicitly created container
          if (this.isTerminatingElement(child.tagName, implicitTag.tagName)) {
            implicitTag = null;
          } else if (implicitTagName && implicitTag.tagName !== implicitTagName) {
            implicitTag = null;
          }
        }
        if (implicitTagName && !implicitTag) {
          implicitTag = {
            type: 'html_element',
            tagName: implicitTagName,
            html: `<${implicitTagName}>`,
            children: [],
          };
          newTags.push(implicitTag);
          children.splice(index, 0, implicitTag);
          index++;
        }
      }
      if (implicitTag) {
        // remove the child and place it in the implicit element instead
        // (e.g. <tr> goes into <tbody>)
        children.splice(index, 1);
        implicitTag.children.push(child);
      } else {
        index++;
      }
    }
    for (let newTag of newTags) {
      this.createImplicitElements(newTag);
      this.removeExtraWhitespaces(newTag);
    }
  }

  removeExtraWhitespaces(element) {
    const { tagName, children } = element;
    if (this.isEvictingElement(tagName)) {
      if (this.options.omitNonvisualWhitespace) {
        let index = 0;
        while (index < children.length) {
          const child = children[index];
          let filter = false;
          if (child.type === 'text') {
            filter = /^\s+$/.test(child.text);
          }
          if (filter) {
            children.splice(index, 1);
          } else {
            index++;
          }
        }
      }
    } else if (this.isSwallowingElement(tagName)) {
      const first = children[0];
      if (first.type === 'text' && /^\n/.test(first.text)) {
        first.text = first.text.substr(1);
        first.html = first.html.substr(1);
      }
    }
  }

  evictStrayElements(element) {
    const { tagName, children } = element;
    const evictions = [];
    if (this.isEvictingElement(tagName)) {
      let index = 0;
      while (index < children.length) {
        const child = children[index];
        let evict = false;
        if (child.type === 'html_element') {
          evict = !this.isExpectedContent(child.tagName, tagName);
        } else if (child.type === 'text') {
          evict = /\S/.test(child.text);
        }
        if (evict) {
          children.splice(index, 1);
          evictions.push(child);
        } else {
          index++;
        }
      }
    }
    return evictions;
  }

  parseHtmlTag(html) {
    const startTag = /^(\s*)<([a-zA-Z][\w.:-]*)([^>]*)>([\s\S]*)/;
    const endTag = /^(\s*)<\/([a-zA-Z][\w.:-]*)[^>]*>([\s\S]*)/;
    let scap = startTag.exec(html);
    if (scap) {
      const attribute = /\s*([a-zA-Z:_][\w.:-]*)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\s"'=<>`]+))?/g;
      const tagType = 'start';
      const tagName = scap[2].toLowerCase();
      const before = scap[1];
      const after = scap[4];
      const attributes = {};
      let m;
      while (m = attribute.exec(scap[3])) {
        const name = m[1]
        const value = m[2] || m[3] || m[4] || '';
        attributes[name] = this.decodeEntities(value);
      }
      return { tagType, tagName, attributes, before, after };
    }
    let ecap = endTag.exec(html);
    if (ecap) {
      const tagType = 'end';
      const tagName = ecap[2].toLowerCase();
      const before = ecap[1];
      const after = ecap[3];
      return { tagType, tagName, before, after };
    }
    return {};
  }

  decodeEntities(html) {
    return decodeHtmlEntities(html);
  }

  isVoidElement(tagName) {
    return voidCheck(tagName);
  }

  isTerminatingElement(tagName, openTagName) {
    const f = terminationChecks[openTagName];
    if (f) {
      return f(tagName);
    }
    return false;
  }

  isExpectedContent(tagName, parentTagName) {
    const f = expectedContentChecks[parentTagName];
    if (f) {
      return f(tagName);
    }
    return false;
  }

  isVivificatingElement(tagName) {
    return vivificationCheck(tagName);
  }

  isStylingElement(tagName) {
    return textStyleCheck(tagName);
  }

  isBlockElement(tagName) {
    return blockCheck(tagName);
  }

  isClearingElement(tagName) {
    return styleClearanceCheck(tagName);
  }

  isEvictingElement(tagName) {
    return contentEvictionCheck(tagName);
  }

  isSwallowingElement(tagName) {
    return linefeedEliminationCheck(tagName);
  }

  getImplicitElements(parentTagName) {
    return implicitElements[parentTagName];
  }
}

export {
  BaseRenderer,
  BaseRenderer as default,
};
