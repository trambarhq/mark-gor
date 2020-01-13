import { Parser } from './parser.mjs';
import { AsyncParser } from './async-parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { PreactRenderer } from './preact-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';
import { findCodeSections, findTextStrings, nextTick } from './helpers.mjs';

function parse(text, options) {
    const parser = new Parser(options);
    const renderer = new PreactRenderer(options);
    const tokens = parser.parse(text);
    const fragment = renderer.render(tokens);
    return fragment;
}

async function parseAsync(text, options) {
    const parser = new AsyncParser(options);
    const renderer = new PreactRenderer(options);
    const tokens = parser.parse(text);
    if (options && options.highlight) {
      for (let token of findCodeSections(tokens)) {
        let highlighted = await options.highlight(token.text, token.lang);
        if (typeof(highlighted) === 'string') {
          highlighted = await parseAsync(highlighted, { htmlOnly: true });
          await nextTick();
        }
        token.highlighted = highlighted;
      }
    }
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
    parseAsync,
    findCodeSections,
    findTextStrings,
};
export * from './defaults.mjs';
