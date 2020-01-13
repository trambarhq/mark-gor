import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { mergeDefaults } from './defaults.mjs';

class Parser {
  constructor(options, props) {
    this.options = mergeDefaults(options);
    this.blockLexer = null;
    this.blockLexerClass = BlockLexer;
    this.inlineLexer = null;
    this.inlineLexerClass = InlineLexer;
    this.text = '';
    this.tokens = [];

    Object.assign(this, props);
  }

  initialize(text) {
    this.text = text;
    this.tokens = [];
    this.blockLexer = new this.blockLexerClass(this.options);
    this.inlineLexer = new this.inlineLexerClass(this.options, {
      links: this.blockLexer.links
    });
  }

  finalize() {
  }

  parse(text) {
    this.initialize(text);
    this.processBlocks();
    this.processInline();
    this.finalize();
    return this.tokens;
  }

  processBlocks() {
    if (this.options.htmlOnly) {
      const type = 'html_block';
      const markdown = this.text;
      const children = null;
      this.tokens = [ { type, markdown, children } ];
    } else {
      this.tokens = this.blockLexer.tokenize(this.text);
    }
  }

  processInline(tokens) {
    this.tokenizeInline(this.tokens);
  }

  tokenizeInline(tokens) {
    for (let token of tokens) {
      const { children, markdown, type } = token;
      if (children) {
        this.tokenizeInline(children);
      } else if (markdown) {
        token.children = this.inlineLexer.tokenize(markdown, type);
      }
    }
  }
}

export {
  Parser,
  Parser as default,
};
