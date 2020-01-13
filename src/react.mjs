import { Parser } from './parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { ReactRenderer } from './react-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';
import { findCodeSections, findTextStrings } from './helpers.mjs';

function parse(text, options) {
    const parser = new Parser(options);
    const renderer = new ReactRenderer(options);
    const tokens = parser.parse(text);
    const fragment = renderer.render(tokens);
    return fragment;
}

export {
    Parser,
    BlockLexer,
    InlineLexer,
    ReactRenderer,
    ReactRenderer as Renderer,
    JsonRenderer,
    JsonRenderer as JSONRenderer,

    parse,
    findCodeSections,
    findTextStrings,
};
export * from './defaults.mjs';
