import { Parser } from './parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { HtmlRenderer } from './html-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';

function parse(text, options) {
    const parser = new Parser(options);
    const renderer = new HtmlRenderer(options);
    const tokens = parser.parse(text);
    if (options && options.highlight) {
      for (let token of tokens) {
        if (token.type === 'code') {
          token.highlighted = options.highlight(token.text, token.lang);
        }
      }
    }
    const html = renderer.render(tokens);
    return html;
}

export {
    parse,
    Parser,
    BlockLexer,
    InlineLexer,
    HtmlRenderer,
    HtmlRenderer as Renderer,
    JsonRenderer,
    JsonRenderer as JSONRenderer,
};
export * from './defaults.mjs';
