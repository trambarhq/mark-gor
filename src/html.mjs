import { Parser } from './parser.mjs';
import { AsyncParser } from './async-parser.mjs';
import { HTMLRenderer } from './html-renderer.mjs';

function parse(text, options) {
  const parser = new Parser(options);
  const renderer = new HTMLRenderer(options);
  const tokens = parser.parse(text);
  const html = renderer.render(tokens);
  return html;
}

function parseAsync(text, options) {
  const parser = new AsyncParser(options);
  const renderer = new HTMLRenderer(options);
  return parser.parse(text).then((tokens) => {
    const html = renderer.render(tokens);
    return html;
  });
}

export { parse, parseAsync };
export * from './parser.mjs';
export * from './async-parser.mjs';
export * from './block-lexer.mjs';
export * from './inline-lexer.mjs';
export * from './parser.mjs';
export * from './html-renderer.mjs';
export * from './json-renderer.mjs';
export * from './defaults.mjs';
export { findCodeSections, findTextStrings } from './helpers.mjs';
