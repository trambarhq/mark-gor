import { Parser } from './parser.mjs';

class HtmlParser extends Parser {
  processBlocks() {
    const type = 'html_block';
    const markdown = this.text;
    const children = null;
    this.tokens.push({ type, markdown, children });
  }
}

export {
  HtmlParser,
  HtmlParser as HTMLParser,
  HtmlParser as default,
};
