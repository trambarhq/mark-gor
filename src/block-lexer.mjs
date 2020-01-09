import { block } from './rules.mjs';
import { splitCells, escape } from './helpers.mjs';
import { mergeDefaults } from './defaults.mjs';
import { decodeHtmlEntities } from './html-entities.mjs';

class BlockLexer {
  constructor(options, props) {
    this.states = [];
    this.topLevel = true;
    this.blockquote = false;
    this.links = {};
    this.input = this.remaining = '';
    this.options = mergeDefaults(options);
    this.rules = block.normal;
    this.tokens = [];

    if (this.options.pedantic) {
      this.rules = block.pedantic;
    } else if (this.options.gfm) {
      this.rules = block.gfm;
    }

    Object.assign(this, props);
  }

  tokenize(text) {
    text = text
            .replace(/\r\n|\r/g, '\n')
            .replace(/\t/g, '    ')
            .replace(/^ +$/gm, '');
    this.initialize(text);
    this.process();
    this.finalize();
    return this.tokens;
  }

  initialize(text, props) {
    this.input = this.remaining = text.replace(/^ +$/gm, '');
    this.tokens = [];
    Object.assign(this, props);
  }

  process() {
    while (this.remaining) {
      this.append(this.captureToken());
    }
  }

  finalize() {
  }

  pushState() {
    this.states.push({
      input: this.input,
      remaining: this.remaining,
      tokens: this.tokens,
      topLevel: this.topLevel,
      blockquote: this.blockquote,
    });
  }

  popState() {
    const state = this.states.pop();
    this.input = state.input;
    this.remaining = state.remaining;
    this.tokens = state.tokens;
    this.topLevel = state.topLevel;
    this.blockquote = state.blockquote;
  }

  append(token) {
    if (!token) {
      return;
    }
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
    this.tokens.push(token);
  }

  capture(rule) {
    const regExp = this.rules[rule];
    const cap = (regExp) ? regExp.exec(this.remaining) : undefined;
    if (cap) {
      const len = cap[0].length;
      this.remaining = this.remaining.substr(len);
      return cap;
    }
  }

  backpedal(text) {
    this.remaining = text + this.remaining;
  }

  captureToken() {
    const token = this.captureNewline()
      || this.captureCode()
      || this.captureFences()
      || this.captureHeading()
      || this.captureTable('nptable')
      || this.captureHorizontalRule()
      || this.captureBlockquote()
      || this.captureList()
      || this.captureHtml()
      || this.captureDefinition()
      || this.captureTable('table')
      || this.captureUnderlineHeading()
      || this.captureParagraph()
      || this.captureText();
    if (token === undefined) {
      if (this.remaining) {
        throw new Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
      }
    }
    return token;
  }

  captureNewline() {
    const cap = this.capture('newline');
    if (cap) {
      if (cap[0].length > 1) {
        const type = 'space';
        return { type };
      }
    }
  }

  captureCode() {
    const cap = this.capture('code');
    if (cap) {
      const lastToken = this.tokens[this.tokens.length - 1];
      // An indented code block cannot interrupt a paragraph.
      if (lastToken && lastToken.type === 'paragraph') {
        lastToken.markdown += '\n' + cap[0].trimRight();
        return null;
      }
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
      const info = cap[2] ? cap[2].trim() : '';
      const type = 'code';
      const lang = info.match(/\S*/)[0] || undefined;
      const text = cap[3] || '';
      const highlighted = null;
      return { type, lang, info, text, highlighted };
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
    if (text) {
      const items = text.replace(/\n$/, '').split('\n');
      for (let item of items) {
        rows.push(this.lexTableRow(rule, item, header));
      }
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
      this.pushState();
      this.initialize(text, { blockquote: true });
      this.process();
      this.finalize();
      const children = this.tokens;
      this.popState();
      // put the text in a <p>
      for (let child of children) {
        if (child.type === 'text_block') {
          child.type = 'paragraph';
        }
      }
      return { type, children };
    }
  }

  captureList() {
    const cap = this.capture('list');
    if (cap) {
      const type = 'list';
      const bull = cap[2];
      const ordered = bull.length > 1;
      const variant = (ordered) ? undefined : bull;
      const first = (ordered) ? parseInt(bull) : undefined;

      // Get each top-level item.
      const items = cap[0].match(this.rules.item);
      const children = [];
      let loose = false;

      for (let i = 0, l = items.length; i < l; i++) {
        let item = items[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        let space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) */, '');

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
        if (!loose) {
          loose = /\n\n(?!\s*$)/.test(item);
        }
        if (i !== l - 1) {
          if (!loose) {
            loose = (item.charAt(item.length - 1) === '\n');
          }
        }

        // Recurse.
        children.push(this.lexListItem(item));
      }
      if (loose) {
        for (let child of children) {
          child.loose = loose;
          for (let itemChild of child.children) {
            if (itemChild.type === 'text_block') {
              itemChild.type = 'paragraph';
            }
          }
        }
      }
      return { type, variant, ordered, first, children };
    }
  }

  lexListItem(text) {
    const type = 'list_item';
    let checked;
    const checkbox = this.lexCheckbox(text);
    if (checkbox) {
      checked = checkbox.checked;
      text = text.substr(checkbox.offset);
    }
    const loose = false;
    this.pushState();
    this.initialize(text, { topLevel: false, blockquote: false });
    this.process();
    this.finalize();
    const children = this.tokens;
    this.popState();
    return { type, checked, loose, children };
  }

  lexCheckbox(text) {
    const ccap = /^\[([ xX])\] +/.exec(text);
    if (ccap) {
      return {
        checked: (ccap[1] !== ' '),
        offset: ccap[0].length,
      };
    }
  }

  captureHtml() {
    const cap = this.capture('html');
    if (cap) {
      let multitag = (cap[0].indexOf('<') !== cap[0].lastIndexOf('<'));
      if (multitag && /^\s*<!\-\-/.test(cap[0])) {
        multitag = false;
      }
      if (multitag) {
        // process markdown content inside tags
        const type = 'html_block';
        const markdown = cap[0];
        const children = null;
        return { type, markdown, children };
      } else {
        // comment or instruction tag
        const type = 'html_tag';
        const html = cap[0];
        return { type, html };
      }
    }
  }

  captureDefinition() {
    if (!this.topLevel) {
      return;
    }
    const cap = this.capture('def');
    if (cap) {
      const type = 'def';
      const name = cap[1].toLowerCase().replace(/\s+/g, ' ');
      const hrefHtml = cap[2];
      let titleHtml;
      if (cap[3]) {
        titleHtml = cap[3].substring(1, cap[3].length - 1);
      };
      const title = this.decodeEntities(titleHtml);
      const href = this.decodeEntities(hrefHtml);
      this.setRefLink(name, { href, hrefHtml, title, titleHtml });
      return { type, name, href, hrefHtml, title, titleHtml };
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
      const markdown = cap[0];
      const children = null;
      return { type, markdown, children };
    }
  }

  decodeEntities(html) {
    return decodeHtmlEntities(html);
  }

  setRefLink(name, link) {
    if (!this.links.hasOwnProperty(name)) {
      this.links[name] = link;
    }
  }
}

export {
  BlockLexer,
  BlockLexer as default,
};
