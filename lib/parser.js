/**
 * Parser
 */

module.exports = Parser;

var defaultOptions = {
  gfm: true,
  breaks: false,
  pedantic: false,
  tables: true,
  smartLists: false,
};

function Parser(/* ...objects */) {
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    for (var key in arg) {
      this[key] = arg[key];
    }
  }

  if (!this.options) {
    this.options = defaultOptions;
  }
  if (!this.blockLexer) {
    var BlockLexer = require('./block-lexer');
    var options = {
      gfm: this.options.gfm,
      tables: this.options.tables,
      pedantic: this.options.pedantic,
      smartLists: this.options.smartLists,
    };
    this.blockLexer = new BlockLexer({
      options: options
    });
  }
  if (!this.inlineLexer) {
    var InlineLexer = require('./inline-lexer');
    var options = {
      gfm: this.options.gfm,
      breaks: this.options.breaks,
      pedantic: this.options.pedantic,
    };
    this.inlineLexer = new InlineLexer({
      options: options,
      links: this.blockLexer.links
    });
  }
}

Parser.prototype.parse = function(text) {
  // normalize text
  var text = text
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  // process at block-level first
  var tokens = this.blockLexer.tokenize(text);

  // recursively replace token containing markdown
  this.processInline(tokens);

  return tokens;
}

Parser.prototype.processInline = function(token) {
  if (token instanceof Array) {
    for (var i = 0; i < token.length; i++) {
      token[i] = this.processInline(token[i]);
    }
  } else {
    if (token.hasOwnProperty('markdown')) {
      var type = token.type;
      var tokens = this.inlineLexer.tokenize(token.markdown);
      for (var key in token) {
        if (key !== 'markdown') {
          tokens[key] = token[key];
        }
      }
      token = tokens;
    }
  }
  return token;
}
