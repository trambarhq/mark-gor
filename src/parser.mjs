import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { defaults } from './defaults.mjs';
import { merge } from './helpers.mjs';

class Parser {
  constructor(options, props) {
    this.options = options;
    if (props) {
      merge(this, props);
    }
  }

  initialize(text) {
    this.text = text;
    this.tokens = [];
    this.blockLexer = new BlockLexer(this.options);
    this.inlineLexer = new InlineLexer(this.options, {
      links: this.blockLexer.links
    });
  }

  parse(text) {
    this.initialize(text);

    // process at block-level first
    this.processBlocks();

    // recursively parse token containing inline markdown
    this.processInline(this.tokens);
    return this.tokens;
  }

  processBlocks() {
    this.tokens = this.blockLexer.tokenize(this.text);
  }

  processInline(tokens) {
    for (let token of tokens) {
      if (token.children) {
        this.processInline(token.children);
      } else if (token.markdown) {
        token.children = this.inlineLexer.tokenize(token.markdown);
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
