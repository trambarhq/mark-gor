/**
 * HTML Renderer
 */

module.exports = HTMLRenderer;

var defaultOptions = {
  sanitize: false,
  sanitizer: null,
  mangle: true,
  highlight: null,
  langPrefix: 'lang-',
  headerPrefix: '',
  xhtml: false
};

function HTMLRenderer(/* ...objects */) {
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    var keys = Object.keys(arg);
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      this[key] = arg[key];
    }
  }

  if (!this.options) {
    this.options = defaultOptions;
  }
}

HTMLRenderer.prototype.render = function(tokens) {
  return this.renderTokens(tokens);
};

HTMLRenderer.prototype.renderChildren = function(token) {
  if (token.children) {
    return this.renderTokens(token.children);
  } else {
    return '';
  }
}

HTMLRenderer.prototype.renderTokens = function(tokens) {
  var fragments = [];
  for (var i = 0; i < tokens.length; i++) {
    fragments.push(this.renderToken(tokens[i]));
  }
  return fragments.join('');
}

HTMLRenderer.prototype.renderToken = function(token) {
    switch (token.type) {
        case 'code': return this.renderCode(token);
        case 'blockquote': return this.renderBlockquote(token);
        case 'html': return this.renderHtml(token);
        case 'heading': return this.renderHeading(token);
        case 'hr': return this.renderHorizontalLine(token);
        case 'list': return this.renderList(token);
        case 'list_item': return this.renderListItem(token);
        case 'loose_item': return this.renderLooseItem(token);
        case 'paragraph': return this.renderParagraph(token);
        case 'table': return this.renderTable(token);
        case 'table_header': return this.renderTableHeader(token);
        case 'table_row': return this.renderTableRow(token);
        case 'table_header_cell': return this.renderTableHeaderCell(token);
        case 'table_row_cell': return this.renderTableRowCell(token);
        case 'strong': return this.renderStrong(token);
        case 'em': return this.renderEmphasized(token);
        case 'codespan': return this.renderCodeSpan(token);
        case 'del': return this.renderDeleted(token);
        case 'br': return this.renderLineBreak(token);
        case 'link': return this.renderLink(token);
        case 'autolink': return this.renderAutolink(token);
        case 'url': return this.renderUrl(token);
        case 'image': return this.renderImage(token);
        case 'text': return this.renderText(token);
        case 'text_block': return this.renderTextBlock(token);
        case 'html_block': return this.renderHtmlBlock(token);
        case 'space': return this.renderSpace(token);
        case 'def': return this.renderRefDefinition(token);
        default:
          throw new
            Error('Unrecognized token: ' + token.type);
    }
}

HTMLRenderer.prototype.renderCode = function(token) {
  var code = token.text;
  var lang = token.lang;
  var escaped = false;
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }
  if (!escaped) {
    code = escape(code, true);
  }
  lang = escape(lang, true);

  if (lang) {
    var className = this.options.langPrefix + lang;
    return '<pre><code class="' + className + '">' + code + '\n</code></pre>\n';
  } else {
    return '<pre><code>' + code + '\n</code></pre>';
  }
};

HTMLRenderer.prototype.renderBlockquote = function(token) {
  return '<blockquote>\n' + this.renderChildren(token) + '</blockquote>\n';
};

HTMLRenderer.prototype.renderHtml = function(token) {
  var html = token.html;
  return html;
};

HTMLRenderer.prototype.renderHeading = function(token) {
  var tag = 'h' + token.depth;
  var id = this.options.headerPrefix + token.name;
  return '<' + tag + ' id="' + id + '">' + this.renderChildren(token) + '</' + tag + '>\n';
};

HTMLRenderer.prototype.renderHorizontalLine = function(token) {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

HTMLRenderer.prototype.renderList = function(token) {
  if (token.ordered) {
    return '<ol>\n' + this.renderChildren(token) + '</ol>\n';
  } else {
    return '<ul>\n' + this.renderChildren(token) + '</ul>\n';
  }
};

HTMLRenderer.prototype.renderLooseItem =
HTMLRenderer.prototype.renderListItem = function(token) {
  return '<li>' + this.renderChildren(token) + '</li>\n';
};

HTMLRenderer.prototype.renderParagraph = function(token) {
  return '<p>' + this.renderChildren(token) + '</p>\n';
};

HTMLRenderer.prototype.renderTable = function(token) {
  var rows = token.children;
  var head = '<thead>' + this.renderTableHeader(rows[0]) + '</thead>';
  var body = '<tbody>' + this.renderTokens(rows.slice(1)) + '</tbody>';
  return '<table>\n' + head + body + '</table>\n';
};

HTMLRenderer.prototype.renderTableHeader =
HTMLRenderer.prototype.renderTableRow = function(token) {
  return '<tr>\n' + this.renderChildren(token) + '</tr>\n';
};

HTMLRenderer.prototype.renderTableHeaderCell = function(token) {
  if (token.align) {
    return '<th style="text-align:' + token.align + '">' + this.renderChildren(token) + '</th>';
  } else {
    return '<th>' + this.renderChildren(token) + '</th>';
  }
};

HTMLRenderer.prototype.renderTableRowCell = function(token) {
  if (token.align) {
    return '<td style="text-align:' + token.align + '">' + this.renderChildren(token) + '</td>';
  } else {
    return '<td>' + this.renderChildren(token) + '</td>';
  }
};

HTMLRenderer.prototype.renderStrong = function(token) {
  return '<strong>' + this.renderChildren(token) + '</strong>';
};

HTMLRenderer.prototype.renderEmphasized = function(token) {
  return '<em>' + this.renderChildren(token) + '</em>';
};

HTMLRenderer.prototype.renderCodeSpan = function(token) {
  var code = escape(token.text, true);
  return '<code>' + code + '</code>';
};

HTMLRenderer.prototype.renderLineBreak = function(token) {
  return this.options.xhtml ? '<br/>' : '<br>';
};

HTMLRenderer.prototype.renderDeleted = function(token) {
  return '<del>' + this.renderChildren(token) + '</del>';
};

HTMLRenderer.prototype.renderUrl =
HTMLRenderer.prototype.renderAutolink = function(token) {
  if (!this.sanitizeUrl(token.href)) {
    return '';
  }
  var href = escape(token.href);
  var text = escape(token.text);
  return '<a href="' + href + '">' + text + '</a>';
};

HTMLRenderer.prototype.renderLink = function(token) {
  if (!this.sanitizeUrl(token.href)) {
    return '';
  }
  var href = escape(token.href);
  var title = escape(token.title);
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + this.renderChildren(token) + '</a>';
  return out;
};

HTMLRenderer.prototype.sanitizeUrl = function(href) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(href)
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return false;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return false;
    }
  }
  return true;
}

HTMLRenderer.prototype.renderImage = function(token) {
  var href = escape(token.href);
  var title = escape(token.title);
  var text = escape(token.text);
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

HTMLRenderer.prototype.renderText = function(token) {
  if (token.escaped) {
    return token.text;
  } else {
    return escape(token.text);
  }
};

HTMLRenderer.prototype.renderHtmlBlock =
HTMLRenderer.prototype.renderTextBlock = function(token) {
  if (token.paragraph) {
    return this.renderParagraph(token);
  } else {
    return this.renderChildren(token);
  }
};

HTMLRenderer.prototype.renderRefDefinition =
HTMLRenderer.prototype.renderSpace = function(token) {
  return '';
};

var helpers = require('./helpers');
var escape = helpers.escape;
