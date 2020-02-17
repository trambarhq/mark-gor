import { Parser } from './parser.mjs';
import { AsyncParser } from './async-parser.mjs';
import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { PreactRenderer } from './preact-renderer.mjs';
import { HTMLRenderer } from './html-renderer.mjs';
import { JsonRenderer } from './json-renderer.mjs';
import { findCodeSections, findTextStrings } from './helpers.mjs';

function parse(text, options) {
  const parser = new Parser(options);
  const renderer = new PreactRenderer(options);
  const tokens = parser.parse(text);
  const fragment = renderer.render(tokens);
  return fragment;
}

function parseAsync(text, options) {
  const parser = new AsyncParser(options);
  const renderer = new PreactRenderer(options);
  return parser.parse(text).then((tokens) => {
    const fragment = renderer.render(tokens);
    return fragment;
  });
}

export { parse, parseAsync };
export * from './parser.mjs';
export * from './async-parser.mjs';
export * from './block-lexer.mjs';
export * from './inline-lexer.mjs';
export * from './parser.mjs';
export * from './preact-renderer.mjs';
export * from './html-renderer.mjs';
export * from './json-renderer.mjs';
export * from './defaults.mjs';
export { findCodeSections, findTextStrings } from './helpers.mjs';
