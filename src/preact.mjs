import { Parser } from './parser.mjs';
import { HtmlParser } from './html-parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { PreactRenderer } from './preact-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';
import { findCodeSections, findTextStrings } from './helpers.mjs';

function parse(text, options) {
    const parser = new Parser(options);
    const renderer = new PreactRenderer(options);
    const tokens = parser.parse(text);
    const fragment = renderer.render(tokens);
    return fragment;
}

function parseHtml(text, options) {
    const parser = new HtmlParser(options);
    const renderer = new ReactRenderer(options);
    const tokens = parser.parse(text);
    const fragment = renderer.render(tokens);
    return fragment;
}

export {
    Parser,
    HtmlParser,
    HtmlParser as HTMLParser,
    BlockLexer,
    InlineLexer,
    PreactRenderer,
    PreactRenderer as Renderer,
    JsonRenderer,
    JsonRenderer as JSONRenderer,

    parse,
    parseHtml,
    parseHtml as parseHTML,
    findCodeSections,
    findTextStrings,
};
export * from './defaults.mjs';
