import { Parser } from './parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { ReactRenderer } from './react-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';

function parse(text, options) {
    const parser = new Parser(options);
    const renderer = new ReactRenderer(options);
    const tokens = parser.parse(text);
    const html = renderer.render(tokens);
    return html;
}

export {
    parse,
    Parser,
    BlockLexer,
    InlineLexer,
    ReactRenderer,
    ReactRenderer as Renderer,
    JsonRenderer,
    JsonRenderer as JSONRenderer,
};
export * from './defaults.mjs';
