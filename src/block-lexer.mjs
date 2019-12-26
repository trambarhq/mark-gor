import { block } from './rules.mjs';
import { merge, splitCells } from './helpers.mjs';
import { defaults } from './defaults.mjs';

class BlockLexer {
  constructor(options, extra) {
    this.topLevel = true;
    this.blockquote = false;
    this.looseItem = false;
    this.links = {};
    this.input = this.remaining = '';
    this.offset = 0;
    this.options = defaults;
    this.rules = block.normal;
    this.tokens = [];

    if (options) {
      this.options = merge({}, defaults, options);
    }
    if (this.options.pedantic) {
      this.rules = block.pedantic;
    } else if (this.options.gfm) {
      this.rules = block.gfm;
    }
    if (extra) {
      merge(this, extra);
    }
  }

  tokenize(text) {
    this.initialize(text);
    while (this.remaining) {
      this.append(this.captureToken());
    }
    return this.tokens;
  }

  initialize(text) {
    this.input = this.remaining = text.replace(/^ +$/gm, '');
    this.offset = 0;
    this.tokens = [];
  }

  append(token) {
    if (token.type === 'text_block') {
      const prevToken = this.tokens[this.tokens.length - 1];
      // merge adjacent text tokens
      if (prevToken && prevToken.type === 'text_block') {
        if (prevToken.paragraph === token.paragraph) {
          prevToken.markdown += '\n' + token.markdown;
          return;
        }
      }
    }
    if (token.type === 'ignore') {
      return;
    }
    this.tokens.push(token);
  }

  capture(rule) {
    const regExp = this.rules[rule];
    const cap = (regExp) ? regExp.exec(this.remaining) : undefined;
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

  captureToken() {
    const token = this.captureNewline()
        || this.captureCode()
        || this.captureFences()
        || this.captureHeading()
        || this.captureTable('nptable')
        || this.captureUnderlineHeading()
        || this.captureHorizontalRule()
        || this.captureBlockquote()
        || this.captureList()
        || this.captureHtml()
        || this.captureDefinition()
        || this.captureTable('table')
        || this.captureParagraph()
        || this.captureText();
    if (!token) {
      if (this.remaining) {
        throw new Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
      }
    }
    return token;
  }

  captureNewline() {
    const cap = this.capture('newline');
    if (cap) {
      const type = (cap[0].length > 1) ? 'space' : 'ignore';
      return { type };
    }
  }

  captureCode() {
    const cap = this.capture('code');
    if (cap) {
      const type = 'code';
      let text = cap[0].replace(/^ {4}/gm, '');
      if (!this.options.pedantic) {
        text = text.replace(/\n+$/, '')
      }
      return { type, text };
    }
  }

  captureFences() {
    const cap = this.capture('fences');
    if (cap) {
      const type = 'code';
      const lang = cap[2];
      const text = cap[3] || '';
      return { type, lang, text };
    }
  }

  captureHeading() {
    const cap = this.capture('heading');
    if (cap) {
      const type = 'heading';
      const variant = '#';
      const depth = cap[1].length;
      const markdown = cap[2];
      const children = null;
      return { type, variant, depth, markdown, children };
    }
  }

  captureTable(rule) {
    if (!this.topLevel) {
      return;
    }
    const cap = this.capture(rule);
    if (cap) {
      const type = 'table';
      const header = this.lexTableHeader(rule, cap[1], cap[2]);
      const rows = this.lexTableRows(rule, cap[3], header);
      const children = [ header, ...rows ];
      return { type, children };
    }
  }

  lexTableAlignments(rule, text) {
    const items = text.replace(/^ *|\| *$/g, '').split(/ *\| */);
    for (let item of items) {
      let align;
      if (/^ *-+: *$/.test(item)) {
        align = 'right';
      } else if (/^ *:-+: *$/.test(item)) {
        align = 'center';
      } else if (/^ *:-+ *$/.test(item)) {
        align = 'left';
      } else {
        align = null;
      }
      aligments.push(align);
    }
    return alignments;
  }

  lexTableHeader(rule, text, textAlign) {
    const type = 'table_header';
    const items = splitCells(text.replace(/^ *| *\| *$/g, ''));
    const itemsAlign = textAlign.replace(/^ *|\| *$/g, '').split(/ *\| */);
    const children = [];
    for (let [ index, item ] of items.entries()) {
      children.push(this.lexTableHeaderCell(rule, item, itemsAlign[index]));
    }
    return { type, children };
  }

  lexTableHeaderCell(rule, text, textAlign) {
    const type = 'table_header_cell';
    let align;
    if (/^ *-+: *$/.test(textAlign)) {
      align = 'right';
    } else if (/^ *:-+: *$/.test(textAlign)) {
      align = 'center';
    } else if (/^ *:-+ *$/.test(textAlign)) {
      align = 'left';
    } else {
      align = null;
    }
    const markdown = text;
    const children = null;
    return { type, align, markdown, children };
  }

  lexTableRows(rule, text, header) {
    const rows = [];
    const items = text.replace(/\n$/, '').split('\n');
    for (let item of items) {
      rows.push(this.lexTableRow(rule, item, header));
    }
    return rows;
  }

  lexTableRow(rule, text, header) {
    if (rule !== 'nptable') {
      text = text.replace(/^ *\| *| *\| *$/g, '');
    }
    const type = 'table_row';
    const children = [];
    const col = header.children.length;
    const items = splitCells(text, col);
    for (let [ index, item ] of items.entries()) {
      const align = (index < col) ? header.children[index].align : null;
      children.push(this.lexTableRowCell(rule, item, align));
    }
    return { type, children };
  }

  lexTableRowCell(rule, text, align) {
    const type = 'table_row_cell';
    const markdown = text;
    const children = null;
    return { type, align, markdown, children };
  }

  captureUnderlineHeading() {
    const cap = this.capture('lheading');
    if (cap) {
      const type = 'heading';
      const variant = cap[2].charAt(0);
      const depth = (variant === '=') ? 1 : 2;
      const markdown = cap[1];
      const children = null;
      return { type, variant, depth, markdown, children };
    }
  }

  captureHorizontalRule() {
    const cap = this.capture('hr');
    if (cap) {
      const type = 'hr';
      const variant = cap[1].charAt(0);
      return { type, variant };
    }
  }

  captureBlockquote() {
    const cap = this.capture('blockquote');
    if (cap) {
      const type = 'blockquote';
      const text = cap[0].replace(/^ *> ?/gm, '');
      // Keep the current "topLevel" state. This is exactly
      // how markdown.pl works.
      const lexer = new BlockLexer(null, {
        blockquote: true,
        options: this.options,
      });
      const children = lexer.tokenize(text);
      return { type, children };
    }
  }

  captureList() {
    const cap = this.capture('list');
    if (cap) {
      const type = 'list';
      const bull = cap[2];
      const ordered = bull.length > 1;

      // Get each top-level item.
      const items = cap[0].match(this.rules.item);
      const children = [];
      let next = false;

      for (let i = 0, l = items.length; i < l; i++) {
        let item = items[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        let space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (i !== l - 1) {
          const b = block.bullet.exec(items[i + 1])[0];
          if (bull.length > 1 ? b.length === 1
            : (b.length > 1 || (this.options.smartLists && b !== bull))) {
            this.backpedal(items.slice(i + 1).join('\n'));
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        let loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        // Recurse.
        children.push(this.lexListItem(item, loose));
      }
      return { type, ordered, children };
    }
  }

  lexListItem(text, loose) {
    const type = 'list_item';
    const lexer = new BlockLexer(null, {
      topLevel: false,
      looseItem: loose,
      blockquote: false,
      options: this.options,
    });
    const children = lexer.tokenize(text);
    return { type, children };
  }

  captureHtml() {
    const cap = this.capture('html');
    if (cap) {
      const pre = cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style';
      if (!pre && !this.options.pedantic) {
        const type = 'html_block';
        const markdown = cap[0];
        const children = null;
        return { type, markdown, children };
      } else {
        const type = 'html_tag';
        const hcap = /(<[^>]*>)(.*)<\/\w+>\s*$/.exec(cap[0]);
        const tagType = 'closed';
        const tagName = cap[1];
        const textContent = hcap[2];
        const html = hcap[1];
        return { type, tagType, tagName, html, textContent };
      }
    }
  }

  captureDefinition() {
    if (this.blockquote || !this.topLevel) {
      return;
    }
    const cap = this.capture('def');
    if (cap) {
      const type = 'def';
      const name = cap[1].toLowerCase().replace(/\s+/g, ' ');
      const href = cap[2];
      const title = (cap[3]) ? cap[3].substring(1, cap[3].length - 1) : '';
      this.setRefLink(name, { href, title });
      return { type, name, href, title };
    }
  }

  captureParagraph() {
    if (!this.topLevel) {
      return;
    }
    const cap = this.capture('paragraph');
    if (cap) {
      const type = 'paragraph';
      let markdown = cap[1];
      if (markdown.charAt(markdown.length - 1) === '\n') {
        markdown = text.slice(0, -1);
      }
      const children = null;
      return { type, markdown, children };
    }
  }

  captureText() {
    const cap = this.capture('text');
    if (cap) {
      const type = 'text_block';
      // Top-level should never reach here.
      if (this.topLevel) {
        console.warn('Unreachable code reached');
      }
      // put the text in a <p> if it's in a blockquote or a loose item
      const paragraph = this.blockquote || this.looseItem;
      const markdown = cap[0];
      const children = null;
      return { type, paragraph, markdown, children };
    }
  }

  setRefLink(name, link) {
    if (!this.links[name]) {
      this.links[name] = link;
    }
  }
}

export {
  BlockLexer,
  BlockLexer as default,
};
