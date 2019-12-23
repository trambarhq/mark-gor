import { expect } from 'chai';

import { InlineLexer } from '../src/inline-lexer.mjs';

describe('InlineLexer', function() {
    it ('should capture emphasized text delimited by *', function() {
        const lexer = new InlineLexer;
        const text = `*Hello world*`;
        const tokens = lexer.tokenize(text);
        expect(tokens[0]).to.have.property('type', 'em');
        expect(tokens[0]).to.have.property('markdown', 'Hello world');
    })
    it ('should capture emphasized text delimited by _', function() {
        const lexer = new InlineLexer;
        const text = `_Hello world_`;
        const tokens = lexer.tokenize(text);
        expect(tokens[0]).to.have.property('type', 'em');
        expect(tokens[0]).to.have.property('markdown', 'Hello world');
    })
    it ('should capture emphasized text delimited by **', function() {
        const lexer = new InlineLexer;
        const text = `**Hello world**`;
        const tokens = lexer.tokenize(text);
        expect(tokens[0]).to.have.property('type', 'strong');
        expect(tokens[0]).to.have.property('markdown', 'Hello world');
    })
    it ('should capture emphasized text delimited by __', function() {
        const lexer = new InlineLexer;
        const text = `__Hello world__`;
        const tokens = lexer.tokenize(text);
        expect(tokens[0]).to.have.property('type', 'strong');
        expect(tokens[0]).to.have.property('markdown', 'Hello world');
    })
    it ('should ignore escaped asterisks', function() {
        const lexer = new InlineLexer;
        const text = `\\*literal asterisks\\*`;
        const tokens = lexer.tokenize(text);
        expect(tokens[0]).to.have.property('type', 'text');
        expect(tokens[0]).to.have.property('text', '*literal asterisks*');
    })
    it ('should capture deleted text', function() {
        const lexer = new InlineLexer;
        const text = `~Hello world~`;
        const tokens = lexer.tokenize(text);
        expect(tokens[0]).to.have.property('type', 'del');
        expect(tokens[0]).to.have.property('markdown', 'Hello world');
    })
})
