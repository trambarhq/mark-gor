import { BlockLexer } from './block-lexer.mjs';
import { nextTick } from './helpers.mjs';

class AsyncBlockLexer extends BlockLexer {
  async tokenize(text) {
    this.initialize(text);
    await this.process();
    return this.tokens;
  }

  async process() {
    while (this.remaining) {
      const token = this.captureToken();
      this.append(token);
      await nextTick();
    }
  }
}

export {
  AsyncBlockLexer,
  AsyncBlockLexer as default,
};
