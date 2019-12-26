import { merge } from './helpers.mjs';
import { defaults } from './defaults.mjs';
import { Slugger } from './slugger.mjs';

class BaseRenderer {
  constructor(options, extra) {
    this.options = defaults;
    this.slugger = new Slugger;

    if (options) {
      this.options = merge({}, defaults, options);
    }
    if (extra) {
      merge(this, extra);
    }
  }

  initialize() {
    this.slugger = new Slugger;
  }

  createElement(type, props, children) { /* abstract */ }

  render(tokens) { /* abstract */ }

  renderChildren(token) {
    if (token.children && token.children.length > 0) {
      return this.renderTokens(token.children);
    }
  }

  renderTokens(tokens) {
    const elements = [];
    for (let token of tokens) {
      const element = this.renderToken(token);
      if (element instanceof Array) {
        for (let e of element) {
          elements.push(e);
        }
      } else if (element) {
        elements.push(element);
      }
    }
    return elements;
  }

  renderToken(token) {
    switch (token.type) {
      case 'text': return this.renderText(token);
      case 'text_block': return this.renderTextBlock(token);
      case 'space': return this.renderSpace(token);
      case 'strong': return this.renderStrong(token);
      case 'em': return this.renderEmphasized(token);
      case 'codespan': return this.renderCodeSpan(token);
      case 'del': return this.renderDeleted(token);
      case 'br': return this.renderLineBreak(token);
      case 'link': return this.renderLink(token);
      case 'autolink': return this.renderAutolink(token);
      case 'url': return this.renderUrl(token);
      case 'image': return this.renderImage(token);
      case 'html_block': return this.renderHtmlBlock(token);
      case 'paragraph': return this.renderParagraph(token);
      case 'code': return this.renderCode(token);
      case 'blockquote': return this.renderBlockquote(token);
      case 'html_tag': return this.renderHtmlTag(token);
      case 'heading': return this.renderHeading(token);
      case 'hr': return this.renderHorizontalRule(token);
      case 'list': return this.renderList(token);
      case 'list_item': return this.renderListItem(token);
      case 'loose_item': return this.renderLooseItem(token);
      case 'table': return this.renderTable(token);
      case 'table_header': return this.renderTableHeader(token);
      case 'table_row': return this.renderTableRow(token);
      case 'table_header_cell': return this.renderTableHeaderCell(token);
      case 'table_row_cell': return this.renderTableRowCell(token);
      case 'def': return this.renderRefDefinition(token);
      default:
        throw new Error('Unrecognized token: ' + token.type);
    }
  }

  renderCode(token) {
    const { text, lang } = token;
    const { langPrefix } = this.options;
    const props = (lang) ? { className: langPrefix + lang } : null;
    const codespan = { type: 'codespan', text };
    const children = this.renderTokens([ codespan ]);
    return this.createElement('pre', null, children);
  }

  renderBlockquote(token) {
    const children = this.renderChildren(token);
    return this.createElement('blockquote', null, children);
  }

  renderHtmlTag(token) {
  }

  renderHeading(token) {
    const { headerPrefix } = this.options;
    const type = `h${token.depth}`;
    const plain = this.renderPlainText(token);
    const name = this.slugger.slug(plain);
    const props = { id: headerPrefix + name };
    const children = this.renderChildren(token);
    return this.createElement(type, props, children);
  }

  renderHorizontalRule(token) {
    return this.createElement('hr');
  }

  renderList(token) {
    const { ordered } = token;
    const type = (ordered) ? 'ol' : 'ul';
    const children = this.renderChildren(token);
    return this.createElement(type, null, children);
  }

  renderListItem(token) {
    const children = this.renderChildren(token);
    return this.createElement('li', null, children);
  }

  renderLooseItem(token) {
    return this.renderListItem(token);
  }

  renderParagraph(token) {
    const children = this.renderChildren(token);
    return this.createElement('p', null, children);
  }

  renderTable(token) {
    const head = this.renderTableHead(token);
    const body = this.renderTableBody(token);
    const children = [ head, body ];
    return this.createElement('table', null, children);
  }

  renderTableHead(token) {
    const children = this.renderTokens(token.children.slice(0, 1));
    return this.createElement('thead', null, children);
  }

  renderTableBody(token) {
    const children = this.renderTokens(token.children.slice(1));
    return this.createElement('tbody', null, children);
  }

  renderTableRow(token) {
    const children = this.renderChildren(token);
    return this.createElement('tr', null, children);
  }

  renderTableHeader(token) {
    return this.renderTableRow(token);
  }

  renderTableHeaderCell(token) {
    const { align } = token;
    const props = (align) ? { align } : null;
    const children = this.renderChildren(token);
    return this.createElement('th', props, children);
  }

  renderTableRowCell(token) {
    const { align } = token;
    const props = (align) ? { align } : null;
    const children = this.renderChildren(token);
    return this.createElement('td', props, children);
  }

  renderStrong(token) {
    const children = this.renderChildren(token);
    return this.createElement('strong', null, children);
  }

  renderEmphasized(token) {
    const children = this.renderChildren(token);
    return this.createElement('em', null, children);
  }

  renderCodeSpan(token) {
    const { text } = token;
    const children = text;
    return this.createElement('code', null, children);
  }

  renderLineBreak(token) {
    return this.createElement('br');
  }

  renderDeleted(token) {
    const children = this.renderChildren(token);
    return this.createElement('del', null, children);
  }

  renderUrl(token) {
    const { href, text } = token;
    if (!this.sanitizeUrl(href)) {
      return '';
    }
    const children = text;
    return this.createElement('a', { href }, children);
  }

  renderAutolink(token) {
    return this.renderUrl(token);
  }

  renderLink(token) {
    const { href, title } = token;
    if (!this.sanitizeUrl(href)) {
      return null;
    }
    const children = this.renderChildren(token);
    return this.createElement('a', { href, title }, children);
  }

  renderImage(token) {
    const { href, title, text } = token;
    return this.createElement('img', { src: href, alt: text, title });
  }

  renderText(token) {
    return token.text;
  }

  renderHtmlBlock(token) {
    return this.renderTextBlock(token);
  }

  renderTextBlock(token) {
    if (token.paragraph) {
      return this.renderParagraph(token);
    } else {
      return this.renderChildren(token);
    }
  }

  renderRefDefinition(token) {
  }

  renderSpace(token) {
  }

  renderPlainText(token) {
    if (token.text) {
      return token.text;
    } else if (token.children) {
      const content = [];
      for (let child of token.children) {
        content.push(this.renderPlainText(child));
      }
      return content.join('');
    } else {
      return '';
    }
  }

  sanitizeUrl(href) {
    if (this.options.sanitize) {
      try {
        const prot = decodeURIComponent(href)
          .replace(/[^\w:]/g, '')
          .toLowerCase();
        if (prot.indexOf('javascript:') === 0
         || prot.indexOf('vbscript:') === 0
         || prot.indexOf('data:') === 0) {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return true;
  }
}

export {
  BaseRenderer,
  BaseRenderer as default,
};
