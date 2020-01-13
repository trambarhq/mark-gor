import { InlineLexer } from './inline-lexer.mjs';
import { nextTick } from './helpers.mjs';

class AsyncInlineLexer extends InlineLexer {
  async tokenize(text, containerType) {
    this.initialize(text, containerType);
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
  AsyncInlineLexer,
  AsyncInlineLexer as default,
};
