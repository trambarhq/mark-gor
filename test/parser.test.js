import { expect } from 'chai';

import { Parser } from '../src/parser.mjs';
import { parse } from '../src/html.mjs';

describe('Parser', function() {
  it ('should process both block and inline tokens', function() {
    const parser = new Parser;
    const text = `
* This should be
* An unordered list

1. This should be
2. An unordered list
`;
    const tokens = parser.parse(text);
    expect(tokens).to.have.lengthOf(2);
    expect(tokens[0]).to.have.property('type', 'list');
    expect(tokens[0]).to.have.property('ordered', false);
    expect(tokens[0].children).to.have.lengthOf(2);
    expect(tokens[1]).to.have.property('type', 'list');
    expect(tokens[1]).to.have.property('ordered', true);
    const items = tokens[1].children;
    expect(items).to.have.lengthOf(2);
    expect(items[0]).to.have.property('type', 'list_item');
    const content = items[0].children[0];
    expect(content).to.have.property('type', 'text_block');
  })
  it ('should leave p with missing end tags as is when normalizeTags = false', function() {
    const options = { normalizeTags: false };
    const markdown = `<p>Hello<p>World`;
    const html = parse(markdown, options)
    expect(html).to.equal('<p>Hello<p>World');
  })
  it ('should close <p> with missing end tags', function() {
    const options = { normalizeTags: true };
    const markdown = `<p>Hello<p>World`;
    const html = parse(markdown, options)
    expect(html).to.equal('<p>Hello</p><p>World</p>');
  })
  it ('should close <li> with missing end tags', function() {
    const options = { normalizeTags: true };
    const markdown = `<ul><li>Hello<li>World</ul>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<ul><li>Hello</li><li>World</li></ul>');
  })
  it ('should add <tbody> tag to <table>', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<table><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should create new <tbody> when there is an explicit one', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><tr><td>Hello</td><td>World</td></tr><tbody><tr><td>Hello</td></tr></tbody><tr><td>Hello</td></tr></table>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<table><tbody><tr><td>Hello</td><td>World</td></tr></tbody><tbody><tr><td>Hello</td></tr></tbody><tbody><tr><td>Hello</td></tr></tbody></table>');
  })
  it ('should close <caption> with missing end tags', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><caption>Caption<tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<table><caption>Caption</caption><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should add <colgroup> tag to <table>', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><caption>Caption<col><tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<table><caption>Caption</caption><colgroup><col></colgroup><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should add <col> tag to same implicit <col>', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><caption>Caption<col><col span="2"><tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<table><caption>Caption</caption><colgroup><col><col span="2"></colgroup><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should not close <li> when it belongs to a new list', function() {
    const options = { normalizeTags: true };
    const markdown = `<ul><li>Hello<li>World<li><ul><li>!</ul>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<ul><li>Hello</li><li>World</li><li><ul><li>!</li></ul></li></ul>');
  })
  it ('should handle attribute without enclosing quotation marks', function() {
    const options = { normalizeTags: true };
    const markdown = `<img src=hello.png>`;
    const html = parse(markdown, options)
    expect(html).to.equal('<img src="hello.png">');
  })

})
