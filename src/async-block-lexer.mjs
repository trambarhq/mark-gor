import { BlockLexer } from './block-lexer.mjs';

class AsyncBlockLexer extends BlockLexer {
  async tokenize(text) {
    await this.initialize(text);
    await this.process();
    await this.finalize();
    return this.tokens;
  }

  async process() {
    while (this.remaining) {
      const tokens = await this.captureTokens(10);
      for (let token of tokens) {
        this.append(token);
      }
    }
  }

  async captureTokens(count) {
    const tokens = [];
    do {
      const token = this.captureToken();
      if (token !== undefined) {
        tokens.push(token);
      }
    } while (tokens.length < count && this.remaining);
    return tokens;
  }
}

export {
  AsyncBlockLexer,
  AsyncBlockLexer as default,
};
