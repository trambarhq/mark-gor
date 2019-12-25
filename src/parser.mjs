import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { defaults } from './defaults.mjs';
import { merge } from './helpers.mjs';

class Parser {
  constructor(options, extra) {
    this.options = options;
    if (extra) {
      merge(this, extra);
    }
  }

  parse(text) {
    // process at block-level first
    const blockLexer = new BlockLexer(this.options);
    const tokens = blockLexer.tokenize(text);

    // recursively parse token containing inline markdown
    this.processInline(tokens, blockLexer.links);
    return tokens;
  }

  processInline(tokens, links) {
    for (let token of tokens) {
      if (token.children) {
        this.processInline(token.children, links);
      } else if (token.markdown) {
        const inlineLexer = new InlineLexer(this.options, { links });
        token.children = inlineLexer.tokenize(token.markdown);
      }
    }
  }
}

function parseJSON(text, options) {
    const parser = new Parser(options);
    const renderer = new JsonRenderer(options);
    const tokens = parser.parse(text);
    const json = renderer.render(tokens);
    return json;
}

export {
  parseJSON,
  Parser,
  Parser as default,
};
