import { expect } from 'chai';

import { InlineLexer } from '../src/inline-lexer.mjs';

describe('InlineLexer', function() {
  it ('should capture emphasized text delimited by *', function() {
    const lexer = new InlineLexer;
    const text = `*Hello world*`;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'em');
    expect(tokens[0]).to.have.property('variant', '*');
    expect(tokens[0]).to.have.property('markdown', 'Hello world');
  })
  it ('should capture emphasized text delimited by _', function() {
    const lexer = new InlineLexer;
    const text = `_Hello world_`;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'em');
    expect(tokens[0]).to.have.property('variant', '_');
    expect(tokens[0]).to.have.property('markdown', 'Hello world');
  })
  it ('should capture emphasized text delimited by **', function() {
    const lexer = new InlineLexer;
    const text = `**Hello world**`;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'strong');
    expect(tokens[0]).to.have.property('variant', '*');
    expect(tokens[0]).to.have.property('markdown', 'Hello world');
  })
  it ('should capture emphasized text delimited by __', function() {
    const lexer = new InlineLexer;
    const text = `__Hello world__`;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'strong');
    expect(tokens[0]).to.have.property('variant', '_');
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
  it ('should capture URL', function() {
    const lexer = new InlineLexer;
    const text = `This is a test http://hello.net`;
    const tokens = lexer.tokenize(text);
    expect(tokens[1]).to.have.property('type', 'url');
    expect(tokens[1]).to.have.property('href', 'http://hello.net');
  })
  it ('should capture e-mail address', function() {
    const lexer = new InlineLexer;
    const text = `My address: chernyshevsky@hotmail.com`;
    const tokens = lexer.tokenize(text);
    expect(tokens[1]).to.have.property('type', 'url');
    expect(tokens[1]).to.have.property('href', 'mailto:chernyshevsky@hotmail.com');
  })
  it ('should capture e-mail address', function() {
    const lexer = new InlineLexer;
    const text = `My address: chernyshevsky@hotmail.com`;
    const tokens = lexer.tokenize(text);
    expect(tokens[1]).to.have.property('type', 'url');
    expect(tokens[1]).to.have.property('href', 'mailto:chernyshevsky@hotmail.com');
  })
  it ('should capture inline image', function () {
    const lexer = new InlineLexer;
    const text = `Image: ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)`;
    const tokens = lexer.tokenize(text);
    expect(tokens[1]).to.have.property('type', 'image');
    expect(tokens[1]).to.have.property('text', 'alt text');
    expect(tokens[1]).to.have.property('href', 'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png');
  })
  it ('should capture inline image with title', function () {
    const lexer = new InlineLexer;
    const text = `Image: ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")`;
    const tokens = lexer.tokenize(text);
    expect(tokens[1]).to.have.property('type', 'image');
    expect(tokens[1]).to.have.property('text', 'alt text');
    expect(tokens[1]).to.have.property('href', 'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png');
    expect(tokens[1]).to.have.property('title', 'Logo Title Text 1');
  })
  it ('should capture inline image by ref', function () {
    const links = {
      logo: {
        href: 'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png',
        title: 'Logo Title Text 1'
      }
    };
    const lexer = new InlineLexer(null, { links });
    const text = `Image: ![alt text][logo]`;
    const tokens = lexer.tokenize(text);
    expect(tokens[1]).to.have.property('type', 'image');
    expect(tokens[1]).to.have.property('text', 'alt text');
    expect(tokens[1]).to.have.property('href', 'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png');
    expect(tokens[1]).to.have.property('title', 'Logo Title Text 1');
  })
  it ('should ignore inline image when ref is missing', function () {
    const lexer = new InlineLexer;
    const text = `Image: ![alt text][logo]`;
    const tokens = lexer.tokenize(text);
    expect(tokens[0]).to.have.property('type', 'text');
    expect(tokens[0]).to.have.property('text', 'Image: ![alt text][logo]');
  })
})
