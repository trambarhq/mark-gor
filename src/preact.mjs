import { Parser, parseJSON } from './parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { PreactRenderer } from './preact-renderer.mjs';

function parse(text, options) {
    const parser = new Parser(options);
    const renderer = new PreactRenderer(options);
    const tokens = parser.parse(text);
    const html = renderer.render(tokens);
    return html;
}

export {
    parse,
    parseJSON,
    Parser,
    BlockLexer,
    InlineLexer,
    PreactRenderer,
    PreactRenderer as Renderer,
};
export * from './defaults.mjs';
