import { Parser } from './parser.mjs';
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

export {
    Parser,
    BlockLexer,
    InlineLexer,
    PreactRenderer,
    PreactRenderer as Renderer,
    JsonRenderer,
    JsonRenderer as JSONRenderer,

    parse,
    findCodeSections,
    findTextStrings,
};
export * from './defaults.mjs';
