import { Parser } from './parser.mjs';
import { AsyncInlineLexer } from './async-inline-lexer.mjs';
import { AsyncBlockLexer } from './async-block-lexer.mjs';

class AsyncParser extends Parser {
  constructor(options, props) {
    super(options, {
      blockLexerClass: AsyncBlockLexer,
      inlineLexerClass: AsyncInlineLexer,
      ...props,
    });
  }

  async parse(text) {
    this.initialize(text);
    await this.processBlocks();
    await this.processInline();
    this.finalize();
    return this.tokens;
  }

  async processBlocks() {
    this.tokens = await this.blockLexer.tokenize(this.text);
  }

  async processInline(tokens) {
    await this.tokenizeInline(this.tokens);
  }

  async tokenizeInline(tokens) {
    for (let token of tokens) {
      const { children, markdown, type } = token;
      if (children) {
        await this.tokenizeInline(children);
      } else if (markdown) {
        token.children = await this.inlineLexer.tokenize(markdown, type);
      }
    }
  }
}

export {
  AsyncParser,
  AsyncParser as default,
};
