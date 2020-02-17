import { Parser } from './parser.mjs';
import { AsyncInlineLexer } from './async-inline-lexer.mjs';
import { AsyncBlockLexer } from './async-block-lexer.mjs';
import { eachAsync, findCodeSections } from './helpers.mjs';

class AsyncParser extends Parser {
  constructor(options, props) {
    super(options, {
      blockLexerClass: AsyncBlockLexer,
      inlineLexerClass: AsyncInlineLexer,
      ...props,
    });
  }

  parse(text) {
    this.initialize(text);
    return this.processBlocks().then(() => {
      return this.processInline().then(() => {
        return this.processCode().then(() => {
          return this.tokens;
        });
      });
    });
  }

  processBlocks() {
    if (this.options.htmlOnly) {
      const type = 'html_block';
      const markdown = this.text;
      const children = null;
      this.tokens = [ { type, markdown, children } ];
      return Promise.resolve();
    } else {
      return this.blockLexer.tokenize(this.text).then((tokens) => {
        this.tokens = tokens;
      });
    }
  }

  processInline(tokens) {
    return this.tokenizeInline(this.tokens);
  }

  tokenizeInline(tokens) {
    return eachAsync(tokens, (token) => {
      const { children, markdown, type } = token;
      if (children) {
        return this.tokenizeInline(children);
      } else if (markdown) {
        return this.inlineLexer.tokenize(markdown, type).then((tokens) => {
          token.children = tokens;
        });
      } else {
        return Promise.resolve();
      }
    });
  }

  processCode() {
    const { highlight } = this.options;
    if (highlight) {
      const sections = findCodeSections(this.tokens);
      return eachAsync(sections, (section) => {
        const html = highlight(section.text, section.lang);
        return Promise.resolve(html).then((html) => {
          if (typeof(html) === 'string') {
            const parser = new this.constructor({ htmlOnly: true });
            return parser.parse(html).then((tokens) => {
              section.children = tokens;
            });
          }
        });
      });
    } else {
      return Promise.resolve();
    }
  }
}

export {
  AsyncParser,
};
