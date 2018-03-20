/**
 * Block Lexer
 */

function BlockLexer(/* ...objects */) {
  this.topLevel = true;
  this.blockquote = false;
  this.looseItem = false;
  this.links = {};
  this.remaining = '';
  this.offset = 0;

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    var keys = Object.keys(arg);
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      this[key] = arg[key];
    }
  }

  if (!this.options) {
    this.options = BlockLexer.defaults;
  }
  if (!this.rules) {
    this.rules = block.normal;
    if (this.options.gfm) {
      if (this.options.tables) {
        this.rules = block.tables;
      } else {
        this.rules = block.gfm;
      }
    }
  }
}

BlockLexer.defaults = {
  gfm: true,
  tables: true,
  pedantic: false,
  smartLists: false,
};

BlockLexer.prototype.setRefLink = function(name, link) {
  this.links[name] = link;
};

BlockLexer.prototype.tokenize = function(text) {
  var tokens = [];
  var prevToken = null;
  text = text.replace(/^ +$/gm, '');
  this.remaining = text.replace(/^ +$/gm, '');
  this.offset = 0;
  while (this.remaining) {
    var before = this.offset;
    var token = this.captureToken();
    var after = this.offset;
    if (!token) {
      throw new
        Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
    }
    token.captured = text.substring(before, after);
    if (token.type === 'text_block') {
      // merge adjacent text tokens
      if (prevToken && prevToken.type === 'text_block') {
        if (prevToken.paragraph === token.paragraph) {
          prevToken.markdown += '\n' + token.markdown;
          continue;
        }
      }
    } else if (token.type === 'ignore') {
      continue;
    }
    tokens.push(token);
    prevToken = token;
  }
  return tokens;
}

BlockLexer.prototype.captureToken = function() {
  return this.captureNewline()
      || this.captureCode()
      || this.captureFences()
      || this.captureHeading()
      || this.captureTable(true)
      || this.captureLHeading()
      || this.captureHR()
      || this.captureBlockquote()
      || this.captureList()
      || this.captureHtml()
      || this.captureDef()
      || this.captureTable(false)
      || this.captureParagraph()
      || this.captureText();
}

BlockLexer.prototype.captureNewline = function() {
  var cap = this.capture(this.rules.newline);
  if (cap) {
    if (cap[0].length > 1) {
      return {
        type: 'space',
      };
    } else {
      return {
        type: 'ignore',
      };
    }
  }
}

BlockLexer.prototype.captureCode = function() {
  var cap = this.capture(this.rules.code);
  if (cap) {
    var text = cap[0].replace(/^ {4}/gm, '');
    if (!this.options.pedantic) {
      text = text.replace(/\n+$/, '')
    }
    return {
      type: 'code',
      text: text,
    };
  }
}

BlockLexer.prototype.captureFences = function() {
  var cap = this.capture(this.rules.fences);
  if (cap) {
    return {
      type: 'code',
      lang: cap[2],
      text: cap[3] || '',
    };
  }
}

BlockLexer.prototype.captureHeading = function() {
  var cap = this.capture(this.rules.heading);
  if (cap) {
    var name = cap[2].toLowerCase().replace(/[^\w]+/g, '-');
    return {
      type: 'heading',
      name: name,
      depth: cap[1].length,
      markdown: cap[2],
      children: null
    };
  }
}

BlockLexer.prototype.captureTable = function(noLeadingPipe) {
  if (!this.topLevel) {
    return;
  }
  var rule = noLeadingPipe
    ? this.rules.nptable
    : this.rules.table;
  var cap = this.capture(rule);
  if (cap) {
    var header = cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */);
    var align = cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */);
    var cells = noLeadingPipe
      ? cap[3].replace(/\n$/, '').split('\n')
      : cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')

    for (var i = 0; i < align.length; i++) {
      if (/^ *-+: *$/.test(align[i])) {
        align[i] = 'right';
      } else if (/^ *:-+: *$/.test(align[i])) {
        align[i] = 'center';
      } else if (/^ *:-+ *$/.test(align[i])) {
        align[i] = 'left';
      } else {
        align[i] = null;
      }
    }

    for (var i = 0; i < cells.length; i++) {
      if (noLeadingPipe) {
        cells[i] = cells[i].split(/ *\| */);
      } else {
        cells[i] = cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }
    }

    var tableToken = {
      type: 'table',
      children: [],
    };
    var headerToken = {
      type: 'table_header',
      children: [],
    };
    for (var i = 0; i < header.length; i++) {
      headerToken.children.push({
        type: 'table_header_cell',
        align: align[i],
        markdown: header[i],
        children: null
      });
    }
    tableToken.children.push(headerToken);

    for (var j = 0; j < cells.length; j++) {
      var row = cells[j];
      var rowToken = {
        type: 'table_row',
        children: [],
      };
      for (var i = 0; i < row.length; i++) {
        rowToken.children.push({
          type: 'table_row_cell',
          align: align[i],
          markdown: row[i],
          children: null
        })
      }
      tableToken.children.push(rowToken);
    }
    return tableToken;
  }
}

BlockLexer.prototype.captureLHeading = function() {
  var cap = this.capture(this.rules.lheading);
  if (cap) {
    var name = cap[1].toLowerCase().replace(/[^\w]+/g, '-');
    return {
      type: 'heading',
      name: name,
      depth: cap[2] === '=' ? 1 : 2,
      markdown: cap[1],
      children: null,
    };
  }
}

BlockLexer.prototype.captureHR = function() {
  var cap = this.capture(this.rules.hr);
  if (cap) {
    return {
      type: 'hr',
    };
  }
}

BlockLexer.prototype.captureBlockquote = function() {
  var cap = this.capture(this.rules.blockquote);
  if (cap) {
    var text = cap[0].replace(/^ *> ?/gm, '');
    // Keep the current "topLevel" state. This is exactly
    // how markdown.pl works.
    var lexer = new BlockLexer(this, { blockquote: true })
    var tokens = lexer.tokenize(text);
    return {
      type: 'blockquote',
      children: tokens
    };
  }
}

BlockLexer.prototype.captureList = function() {
  var cap = this.capture(this.rules.list);
  if (cap) {
    var bull = cap[2];
    var listToken = {
      type: 'list',
      ordered: bull.length > 1,
      children: [],
    };

    // Get each top-level item.
    cap = cap[0].match(this.rules.item);

    var next = false;

    for (var i = 0, l = cap.length; i < l; i++) {
      var item = cap[i];

      // Remove the list item's bullet
      // so it is seen as the next token.
      var space = item.length;
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
      if (this.options.smartLists && i !== l - 1) {
        var b = block.bullet.exec(cap[i + 1])[0];
        if (bull !== b && !(bull.length > 1 && b.length > 1)) {
          this.backpedal(cap.slice(i + 1).join('\n'));
          i = l - 1;
        }
      }

      // Determine whether item is loose or not.
      // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
      // for discount behavior.
      var loose = next || /\n\n(?!\s*$)/.test(item);
      if (i !== l - 1) {
        next = item.charAt(item.length - 1) === '\n';
        if (!loose) loose = next;
      }

      // Recurse.
      var lexer = new BlockLexer(this, { topLevel: false, looseItem: loose, blockquote: false });
      var tokens = lexer.tokenize(item);
      listToken.children.push({
        type: 'list_item',
        children: tokens,
      });
    }
    return listToken;
  }
}

BlockLexer.prototype.captureHtml = function() {
  var cap = this.capture(this.rules.html);
  if (cap) {
    var pre = cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style';
    if (!pre && !this.options.pedantic) {
      return {
        type: 'html_block',
        markdown: cap[0],
        children: null
      };
    } else {
      return {
        type: 'html',
        html: cap[0],
      };
    }
  }
}

BlockLexer.prototype.captureDef = function() {
  if (this.blockquote || !this.topLevel) {
    return;
  }
  var cap = this.capture(this.rules.def);
  if (cap) {
    var name = cap[1].toLowerCase();
    this.setRefLink(name, {
      href: cap[2],
      title: cap[3],
    });
    return {
      type: 'def',
      href: cap[2],
      title: cap[3],
    };
  }
}

BlockLexer.prototype.captureParagraph = function() {
  if (!this.topLevel) {
    return;
  }
  var cap = this.capture(this.rules.paragraph);
  if (cap) {
    var text = cap[1];
    if (text.charAt(text.length - 1) === '\n') {
      text = text.slice(0, -1);
    }
    return {
      type: 'paragraph',
      markdown: text,
      children: null
    };
  }
}

BlockLexer.prototype.captureText = function() {
  var cap = this.capture(this.rules.text);
  if (cap) {
    // Top-level should never reach here.
    if (this.topLevel) {
      console.warn('Unreachable code reached');
    }
    // put the text in a <p> if it's in a blockquote or a loose item
    return {
      type: 'text_block',
      paragraph: this.blockquote || this.looseItem,
      markdown: cap[0],
      children: null,
    };
  }
}

BlockLexer.prototype.capture = function(regExp) {
  var cap = regExp.exec(this.remaining);
  if (cap) {
    var len = cap[0].length;
    this.remaining = this.remaining.substr(len);
    this.offset += len;
    return cap;
  }
}

BlockLexer.prototype.backpedal = function(text) {
  this.remaining = text + this.remaining;
  this.offset -= text.length;
}

/**
 * Block-Level Grammar
 */

var helpers = require('./helpers');
var noop = helpers.noop;
var merge = helpers.merge;
var replace = helpers.replace;

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

module.exports = BlockLexer;
