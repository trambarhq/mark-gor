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
        expect(tokens[0]).to.have.property('style', 'hash');
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
        expect(tokens[0]).to.have.property('style', 'line');
        expect(tokens[1]).to.have.property('type', 'heading');
        expect(tokens[1]).to.have.property('depth', 2);
    })
    it ('should capture code section', function() {
        const lexer = new BlockLexer;
        const text = '```perl\nprint("Hello World");\n```\n';
        const tokens = lexer.tokenize(text);
        expect(tokens[0]).to.have.property('type', 'code');
        expect(tokens[0]).to.have.property('lang', 'perl');
        expect(tokens[0]).to.have.property('text', 'print("Hello World");');
    })
})
