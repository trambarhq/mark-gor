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
    var keys = Object.keys(arg);
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
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

Parser.prototype.processInline = function(tokens) {
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.children) {
      this.processInline(token.children);
    } else if (token.markdown) {
      token.children = this.inlineLexer.tokenize(token.markdown);
    }
  }
  return token;
}
