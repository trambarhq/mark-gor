import { Parser } from './parser.mjs';
import { HtmlParser } from './html-parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { HtmlRenderer } from './html-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';
import { findCodeSections, findTextStrings } from './helpers.mjs';

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

function parseHtml(text, options) {
    const parser = new HtmlParser(options);
    const renderer = new HtmlRenderer(options);
    const tokens = parser.parse(text);
    const html = renderer.render(tokens);
    return html;
}

export {
    Parser,
    HtmlParser,
    HtmlParser as HTMLParser,
    BlockLexer,
    InlineLexer,
    HtmlRenderer,
    HtmlRenderer as Renderer,
    JsonRenderer,
    JsonRenderer as JSONRenderer,

    parse,
    parseHtml,
    parseHtml as parseHTML,
    findCodeSections,
    findTextStrings,
};
export * from './defaults.mjs';
