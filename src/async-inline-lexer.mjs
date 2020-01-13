import { InlineLexer } from './inline-lexer.mjs';

class AsyncInlineLexer extends InlineLexer {
  async tokenize(text, containerType) {
    await this.initialize(text, containerType);
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
  AsyncInlineLexer,
  AsyncInlineLexer as default,
};
