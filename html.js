var Parser = require('./lib/parser');
var BlockLexer = require('./lib/block-lexer');
var InlineLexer = require('./lib/inline-lexer');
var HtmlRenderer = require('./lib/html-renderer');

var helpers = require('./lib/helpers');
var merge = helpers.merge;
var pick = helpers.pick;

function parse(text, options) {
    var parser = new Parser({ options: pick(options, Parser.defaults) });
    var renderer = new HtmlRenderer({ options: pick(options, HtmlRenderer.defaults) });
    var tokens = parser.parse(text);
    var html = renderer.render(tokens);
    return html;
}

exports.parse = parse;
exports.defaults = merge({}, Parser.defaults, HtmlRenderer.defaults);

exports.BlockLexer = BlockLexer;
exports.InlineLexer = InlineLexer;
exports.Parser = Parser
exports.Renderer = HtmlRenderer;
