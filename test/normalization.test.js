import { expect } from 'chai';

import { parse } from '../src/html.mjs';

function test(title, markdown) {
  markdown = markdown.trim();
  describe(`#${title}`, function() {
    it ('should match the browser\'s behavior', function() {
      const options = { normalizeTags: true };
      const ours = parse(markdown, options);
      const theirs = processThruDOM(markdown);
      if (ours !== theirs) {
        showDiff({ markdown, ours, theirs });
        expect.fail('Not matching');
      }
    })
  })
}

function processThruDOM(html) {
  const div = document.createElement('DIV');
  div.innerHTML = html;
  return div.innerHTML;
}

function showDiff(results) {
  const { markdown, ours, theirs } = results;
  console.log(`MARKDOWN:\n${markdown}\n`);
  console.log(`OURS:\n${ours}\n`);
  console.log(`THEIRS:\n${theirs}\n`);
}

describe('Normalization', function() {
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
  describe('Comparison with DOM', function() {
    test('missing </p>', `
<p>Hello<p>World
    `)
    test('missing </li>', `
<ul><li>Hello<li>World</ul>
    `)
    test('<tbody> omitted', `
<table><tr><td>Hello</td><td>World</td></tr></table>
    `)
    test('missing </caption>', `
<table><caption>Caption<tr><td>Hello</td><td>World</td></tr></table>
    `)
    test('<colgroup> omitted', `
<table><caption>Caption<col><tr><td>Hello</td><td>World</td></tr></table>
    `)
    test('multiple <col>', `
<table><caption>Caption<col><col span="2"><tr><td>Hello</td><td>World</td></tr></table>
    `)
    test('list in list', `
<ul><li>Hello<li>World<li><ul><li>!</ul>
    `)
    test('missing quotes', `
<img src=hello.png>
    `)
    test('stray </p>', `
<div></p></div>
    `)
    test('<div> in <p>', `
<p><div>Hello</div></p>
    `)
  })
})
