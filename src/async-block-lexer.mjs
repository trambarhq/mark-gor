import { BlockLexer } from './block-lexer.mjs';
import { nextTick, loopAsync } from './helpers.mjs';

class AsyncBlockLexer extends BlockLexer {
  tokenize(text) {
    this.initialize(text);
    return this.process().then(() => {
      return this.tokens;
    });
  }

  process() {
    return loopAsync(() => {
      if (this.remaining) {
        const token = this.captureToken();
        this.append(token);
        return nextTick();
      }
    });
  }
}

export {
  AsyncBlockLexer,
};
