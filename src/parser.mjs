import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { merge } from './helpers.mjs';

class Parser {
  constructor(options, extra) {
    this.blockLexer = new BlockLexer(options);
    this.inlineLexer = new InlineLexer(options, {
      links: this.blockLexer.links
    });
    if (extra) {
      merge(this, extra);
    }
  }

  parse(text) {
    // process at block-level first
    const tokens = this.extractBlocks(text);

    // recursively parse token containing inline markdown
    this.processInline(tokens);
    return tokens;
  }

  extractBlocks(text) {
    text = text
      .replace(/\r\n|\r/g, '\n')
      .replace(/\t/g, '    ')
      .replace(/\u00a0/g, ' ')
      .replace(/\u2424/g, '\n');
    return this.blockLexer.tokenize(text);
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
