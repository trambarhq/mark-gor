import { InlineLexer } from './inline-lexer.mjs';
import { nextTick, loopAsync } from './helpers.mjs';

class AsyncInlineLexer extends InlineLexer {
  tokenize(text, containerType) {
    this.initialize(text, containerType);
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
  AsyncInlineLexer,
};
