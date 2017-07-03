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
    for (var key in arg) {
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

HTMLRenderer.prototype.renderTokens = function(tokens) {
  if (!tokens instanceof Array) {
    throw new
      Error('Not an array: ' + tokens.type);
  }
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
        case 'table_header': return this.renderHeader(token);
        case 'table_row': return this.renderTableRow(token);
        case 'table_header_cell': return this.renderTableHeaderCell(token);
        case 'table_row_cell': return this.renderTableRowCell(token);
        case 'strong': return this.renderStrong(token);
        case 'em': return this.renderEmphasized(token);
        case 'codespan': return this.renderCodeSpan(token);
        case 'deleted': return this.renderDeleted(token);
        case 'br': return this.renderLineBreak(token);
        case 'link': return this.renderLink(token);
        case 'autolink': return this.renderAutolink(token);
        case 'image': return this.renderImage(token);
        case 'text': return this.renderText(token);
        case 'space': return this.renderSpace(token);
        default:
          throw new
            Error('Unrecognized token: ' + token.type);
    }
}

HTMLRenderer.prototype.renderCode = function(token) {
  var code = token.code;
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
  return '<blockquote>\n' + this.renderTokens(token) + '</blockquote>\n';
};

HTMLRenderer.prototype.renderHtml = function(token) {
  return html;
};

HTMLRenderer.prototype.renderHeading = function(token) {
  var tag = 'h' + token.level;
  var id = this.options.headerPrefix + token.name;
  return '<' + tag + ' id="' + id + '">' + this.renderTokens(token) + '</' + tag + '>';
};

HTMLRenderer.prototype.renderHorizontalLine = function(token) {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

HTMLRenderer.prototype.renderList = function(token) {
  if (token.ordered) {
    return '<ol>\n' + this.renderTokens(token) + '</ol>';
  } else {
    return '<ul>\n' + this.renderTokens(token) + '</ul>';
  }
};

HTMLRenderer.prototype.renderLooseItem =
HTMLRenderer.prototype.renderListItem = function(token) {
  return '<li>' + this.renderTokens(token) + '</li>\n';
};

HTMLRenderer.prototype.renderParagraph = function(token) {
  return '<p>' + this.renderTokens(token) + '</p>\n';
};

HTMLRenderer.prototype.renderTable = function() {
  return '<table>\n' + this.renderTokens(token) + '</table>\n';
};

HTMLRenderer.prototype.renderTableHeader =
HTMLRenderer.prototype.renderTableRow = function(token) {
  return '<tr>\n' + this.renderTokens(token) + '</tr>\n';
};

HTMLRenderer.prototype.renderTableHeaderCell = function(token) {
  if (token.align) {
    return '<th style="text-align:' + token.align + '">' + this.renderTokens(token) + '</th>';
  } else {
    return '<th>' + this.renderTokens(token) + '</th>';
  }
};

HTMLRenderer.prototype.renderTableRowCell = function(token) {
  if (token.align) {
    return '<td style="text-align:' + token.align + '">' + this.renderTokens(token) + '</td>';
  } else {
    return '<td>' + this.renderTokens(token) + '</td>';
  }
};

HTMLRenderer.prototype.renderStrong = function(token) {
  return '<strong>' + this.renderTokens(token) + '</strong>';
};

HTMLRenderer.prototype.renderEmphasized = function(token) {
  return '<em>' + this.renderTokens(token) + '</em>';
};

HTMLRenderer.prototype.renderCodeSpan = function(token) {
  return '<code>' + this.renderTokens(token) + '</code>';
};

HTMLRenderer.prototype.renderLineBreak = function(token) {
  return this.options.xhtml ? '<br/>' : '<br>';
};

HTMLRenderer.prototype.renderDeleted = function(token) {
  return '<del>' + this.renderTokens(token) + '</del>';
};

HTMLRenderer.prototype.renderAutolink =
HTMLRenderer.prototype.renderLink = function(token) {
  var href = token.href;
  var title = escape(token.title);
  var text = escape(token.text);
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

HTMLRenderer.prototype.renderImage = function(token) {
  var href = token.href;
  var title = escape(token.title);
  var text = escape(token.text);
  var out = '<img src="' + href + '" alt="' + token + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

HTMLRenderer.prototype.renderText = function(token) {
  return escape(token.text);
};

HTMLRenderer.prototype.renderSpace = function(token) {
  return '';
};

var helpers = require('./helpers');
var escape = helpers.escape;
