import { Parser } from './parser.mjs';
import { AsyncParser } from './async-parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { HtmlRenderer } from './html-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';
import { findCodeSections, findTextStrings, nextTick } from './helpers.mjs';

function parse(text, options) {
    const parser = new Parser(options);
    const renderer = new HtmlRenderer(options);
    const tokens = parser.parse(text);
    if (options && options.highlight) {
      for (let token of findCodeSections(tokens)) {
        token.highlighted = options.highlight(token.text, token.lang);
      }
    }
    const html = renderer.render(tokens);
    return html;
}

async function parseAsync(text, options) {
  const parser = new AsyncParser(options);
  const renderer = new HtmlRenderer(options);
  const tokens = await parser.parse(text);
  if (options && options.highlight) {
    for (let token of findCodeSections(tokens)) {
      token.highlighted = await options.highlight(token.text, token.lang);
      await nextTick();
    }
  }
  const html = renderer.render(tokens);
  return html;
}

export {
    Parser,
    BlockLexer,
    InlineLexer,
    HtmlRenderer,
    HtmlRenderer as HTMLRenderer,
    HtmlRenderer as Renderer,
    JsonRenderer,
    JsonRenderer as JSONRenderer,

    parse,
    parseAsync,
    findCodeSections,
    findTextStrings,
};
export * from './defaults.mjs';
