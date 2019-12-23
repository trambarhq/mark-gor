import { expect } from 'chai';

import { BlockLexer } from '../src/block-lexer.mjs';

describe('BlockLexer', function() {
  it ('should capture paragraphs', function() {
    const lexer = new BlockLexer;
    const text = `
This is a test.

This is only a test.
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'paragraph');
    expect(tokens[0]).to.have.property('markdown', 'This is a test.');
    expect(tokens[2]).to.have.property('type', 'paragraph');
    expect(tokens[2]).to.have.property('markdown', 'This is only a test.');
  })
  it ('should capture an unsorted list', function() {
    const lexer = new BlockLexer;
    const text = `
* Item 1
* Item 2
* Item 3
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'list');
    expect(tokens[0]).to.have.property('ordered', false);
    const items = tokens[0].children;
    expect(items).to.have.lengthOf(3);
    expect(items[0]).to.have.property('type', 'list_item');
    expect(items[0].children).to.have.lengthOf(1);
    const content = items[0].children[0];
    expect(content).to.have.property('type', 'text_block');
    expect(content).to.have.property('markdown', 'Item 1');
  })
  it ('should capture an sorted list', function() {
    const lexer = new BlockLexer;
    const text = `
1. Item 1
2. Item 2
3. Item 3
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'list');
    expect(tokens[0]).to.have.property('ordered', true);
    const items = tokens[0].children;
    expect(items).to.have.lengthOf(3);
    expect(items[0]).to.have.property('type', 'list_item');
    expect(items[0].children).to.have.lengthOf(1);
    const content = items[0].children[0];
    expect(content).to.have.property('type', 'text_block');
    expect(content).to.have.property('markdown', 'Item 1');
  })
  it ('should capture # style headings', function() {
    const lexer = new BlockLexer;
    const text = `
# Header 1

## Header 2

### Header 3
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'heading');
    expect(tokens[0]).to.have.property('depth', 1);
    expect(tokens[0]).to.have.property('variant', '#');
    expect(tokens[1]).to.have.property('type', 'heading');
    expect(tokens[1]).to.have.property('depth', 2);
    expect(tokens[2]).to.have.property('type', 'heading');
    expect(tokens[2]).to.have.property('depth', 3);
  })
  it ('should capture underline style headings', function() {
    const lexer = new BlockLexer;
    const text = `
Header 1
========

Header 2
--------
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'heading');
    expect(tokens[0]).to.have.property('depth', 1);
    expect(tokens[0]).to.have.property('variant', '=');
    expect(tokens[1]).to.have.property('type', 'heading');
    expect(tokens[1]).to.have.property('depth', 2);
    expect(tokens[1]).to.have.property('variant', '-');
  })
  it ('should capture code section', function() {
    const lexer = new BlockLexer;
    const text = '```perl\nprint("Hello World");\n```\n';
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'code');
    expect(tokens[0]).to.have.property('lang', 'perl');
    expect(tokens[0]).to.have.property('text', 'print("Hello World");');
  })
  it ('should capture a table', function() {
    const lexer = new BlockLexer;
    const text = `
| Tables        | Are           | Cool  |
| ------------- | ------------- | ----- |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'table');
    const header = tokens[0].children[0];
    expect(header).to.have.property('type', 'table_header');
    const columns = header.children;
    expect(columns).to.have.lengthOf(3);
    expect(columns[0]).to.have.property('type', 'table_header_cell');
    expect(columns[0]).to.have.property('markdown', 'Tables');
    expect(columns[1]).to.have.property('markdown', 'Are');
    expect(columns[2]).to.have.property('markdown', 'Cool');
    const rows = tokens[0].children.slice(1);
    expect(rows).to.have.lengthOf(3);
    expect(rows[0]).to.have.property('type', 'table_row');
    const cells = rows[0].children;
    expect(cells[0]).to.have.property('type', 'table_row_cell');
    expect(cells[0]).to.have.property('markdown', 'col 3 is');
    expect(cells[1]).to.have.property('markdown', 'right-aligned');
    expect(cells[2]).to.have.property('markdown', '$1600');
  })
  it ('should capture a table with alignment', function() {
    const lexer = new BlockLexer;
    const text = `
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
    `;
    const tokens = lexer.tokenize(text);
    const header = tokens[0].children[0];
    const columns = header.children;
    expect(columns[0]).to.have.property('align', null);
    expect(columns[1]).to.have.property('align', 'center');
    expect(columns[2]).to.have.property('align', 'right');
    const rows = tokens[0].children.slice(1);
    const cells = rows[0].children;
    expect(cells[0]).to.have.property('align', null);
    expect(cells[1]).to.have.property('align', 'center');
    expect(cells[2]).to.have.property('align', 'right');
  })
  it ('should capture horizontal rules', function() {
    const lexer = new BlockLexer;
    const text = `
---
***
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'hr');
    expect(tokens[0]).to.have.property('variant', '-');
    expect(tokens[1]).to.have.property('type', 'hr');
    expect(tokens[1]).to.have.property('variant', '*');
  })
  it ('should capture inline HTML', function() {
    const lexer = new BlockLexer;
    const text = `
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'html_block');
    expect(tokens[0]).to.have.property('markdown');
  })
  it ('should capture blockquote', function() {
    const lexer = new BlockLexer;
    const text = `
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.
    `;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'blockquote');
  })
})
