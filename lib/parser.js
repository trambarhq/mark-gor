/**
 * Parser
 */

var BlockLexer = require('./block-lexer');
var InlineLexer = require('./inline-lexer');

var helpers = require('./helpers.js');
var merge = helpers.merge;
var pick = helpers.pick;

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
    this.options = Parser.defaults;
  }
  if (!this.blockLexer) {
    var options = pick(this.options, BlockLexer.defaults);
    this.blockLexer = new BlockLexer({
      options: options
    });
  }
  if (!this.inlineLexer) {
    var options = pick(this.options, InlineLexer.defaults);
    this.inlineLexer = new InlineLexer({
      options: options,
      links: this.blockLexer.links
    });
  }
}

Parser.defaults = merge({}, BlockLexer.defaults, InlineLexer.defaults);

Parser.prototype.parse = function(text) {
  // process at block-level first
  var tokens = this.extractBlocks(text);

  // recursively parse token containing inline markdown
  this.processInline(tokens);
  return tokens;
}

Parser.prototype.extractBlocks = function(text) {
  text = text
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');
  return this.blockLexer.tokenize(text);
};

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

module.exports = Parser;
