import { expect } from 'chai';

import { parseHtml } from '../src/html.mjs';

function test(title, markdown) {
  markdown = markdown.trim();
  describe(`#${title}`, function() {
    it ('should match the browser\'s behavior', function() {
      const options = { normalizeTags: true };
      const ours = parseHtml(markdown, options);
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
  const lf = />\n+</.test(html);
  div.innerHTML = html;
  const result = div.innerHTML;
  return (lf) ? result.replace(/>\n+</g, '><') : result;
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
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<p>Hello<p>World');
  })
  it ('should close <p> with missing end tags', function() {
    const options = { normalizeTags: true };
    const markdown = `<p>Hello<p>World`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<p>Hello</p><p>World</p>');
  })
  it ('should close <h1> with missing end tags', function() {
    const options = { normalizeTags: true };
    const markdown = `<h1>Hello<h2>World`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<h1>Hello</h1><h2>World</h2>');
  })
  it ('should close <li> with missing end tags', function() {
    const options = { normalizeTags: true };
    const markdown = `<ul><li>Hello<li>World</ul>`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<ul><li>Hello</li><li>World</li></ul>');
  })
  it ('should add <tbody> tag to <table>', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<table><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should create new <tbody> when there is an explicit one', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><tr><td>Hello</td><td>World</td></tr><tbody><tr><td>Hello</td></tr></tbody><tr><td>Hello</td></tr></table>`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<table><tbody><tr><td>Hello</td><td>World</td></tr></tbody><tbody><tr><td>Hello</td></tr></tbody><tbody><tr><td>Hello</td></tr></tbody></table>');
  })
  it ('should close <caption> with missing end tags', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><caption>Caption<tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<table><caption>Caption</caption><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should add <colgroup> tag to <table>', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><caption>Caption<col><tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<table><caption>Caption</caption><colgroup><col></colgroup><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should add <col> tag to same implicit <col>', function() {
    const options = { normalizeTags: true };
    const markdown = `<table><caption>Caption<col><col span="2"><tr><td>Hello</td><td>World</td></tr></table>`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<table><caption>Caption</caption><colgroup><col><col span="2"></colgroup><tbody><tr><td>Hello</td><td>World</td></tr></tbody></table>');
  })
  it ('should not close <li> when it belongs to a new list', function() {
    const options = { normalizeTags: true };
    const markdown = `<ul><li>Hello<li>World<li><ul><li>!</ul>`;
    const html = parseHtml(markdown, options)
    expect(html).to.equal('<ul><li>Hello</li><li>World</li><li><ul><li>!</li></ul></li></ul>');
  })
  it ('should handle attribute without enclosing quotation marks', function() {
    const options = { normalizeTags: true };
    const markdown = `<img src=hello.png>`;
    const html = parseHtml(markdown, options)
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
    test('stray </em>', `
<div></em></div>
    `)
    test('stray </del>', `
<div></del></div>
    `)
    test('stray </div>', `
<p></div></p>
    `)
    test('stray </span>', `
<div></span></div>
    `)
    test('<div> in <p>', `
<p><div>Hello</div></p>
    `)
    test('<small><b> terminated by <p>', `
<p><small><b>Hello<p>
    `)
    test('<small><b> terminated by <p> with text', `
<p><u><em>Hello<p>world
    `)
    test('<small><b> terminated by <p> with <span> tossed in', `
<p><small><b><span>Hello<p>world
    `)
    test('<strong> and <i> terminated by <p>', `
<p><i><strong>Hello<p>world
    `)
    test('<strong> and <i> terminated by </p>', `
<p><i><strong>Hello</p><p>world
    `)
    test('<a> terminated by <p>', `
<p><a href="url">Hello<p>world
    `)
    test('<cite> and <code> terminated by <p>', `
<p><cite><code>Hello<p>world
    `)
    test('<pre> terminated by <p>', `
<p><pre>Hello<p>world
    `)
    test('<var> and <time> terminated by <p>', `
<p><var><time>Hello<p>world
    `)
    test('<sub> and <sup> terminated by <p>', `
<p><sub><sup>Hello<p>world
    `)
    test('<del> and <ins> terminated by <p>', `
<p><del><ins>Hello<p>world
    `)
    test('<span> terminated by <p>', `
<p><span>Hello<p>world
    `)
    test('<span> terminated by <p>', `
<p><aside>Hello<p>world
    `)
    test('<u> <em> <section> terminated by <p>', `
<p><u><em><section>Hello<p>world
    `)
    test('<u> <em> <address> terminated by <p>', `
<p><u><em><address>Hello<p>world
    `)
    test('<u> <em> <h1> terminated by <p>', `
<p><u><em><h1>Hello<p>world
    `)
    test('<u> <em> <h1> terminated by <p> with <strong>', `
<p><u><em><h1>Hello<p><strong>world
    `)
    test('<u> <em> <h1> terminated by <p> with <a>', `
<p><u><em><h1>Hello<p><a href="/uri">world</a>
    `)
    test('<u> <em> terminated by <table>', `
<p><u><em><table><tr><td>Hello<td>world</tr></table>
    `)
    test('<u> <em> terminated by <ul>', `
<p><u><em><ul><li>Hello<li>world
    `)
    test('<u> <em> terminated by <ul> with no <li>', `
<p><u><em><ul>Hello
    `)
    test('misplaced </em>', `
<p><u><em>Hello</u></em>
    `)
    test('<u> terminated by <td>', `
<table><tr><td><u>Hello<td>world</tr></table>
    `)
    test('<a> in <a>', `
<a>Hello <a>world</a></a>
    `)
    test('<b> in <b>', `
<b>Hello <b>world</b></b>
    `)
    test('<h2> in <h1>', `
<h1>Hello <h2>world</h2></h1>
    `)
    test('<img> in <img>', `
<img>Hello <img>world</img></img>
    `)
    test('text in <table>', `
<table>Hello<tbody> !<tr> ?<td>world</td></tr></tbody></table>
    `)
    test('<pre> in <table>', `
<table><pre>Hello</pre><tbody> !<tr> ?<td>world</td></tr></tbody></table>
    `)
    test('text in <ul>', `
<ul>Hello<li>World</li></ul>
    `)
    test('leading \n in <pre> ', `
<pre>\n\nHello</pre>
    `)
    test('<strong> <em> terminated by <a>', `
<p><a href="/uri">foo <strong><em>bar <a href="/uri">baz</a></em></a></p>
    `)
    test('<a> terminated by <a> inside block element', `
<a name="hi">hello <p>world</p> <div><b>now<a href="/uri">What?</a></b>!!!</a>
    `)
    test('<p> in <a>', `
<a href="/uri">Hello <p>world</a>
    `)
    test('<p>...<p> in <a>', `
<a href="/uri">Hello <p>world<p>!</a>
    `)
    test('<a> in <td> unterminated', `
<table>\n<tr>\n<td><a name="hi">hello</td>\n<td><a name="ho">world</td>\n</tr>\n</table>
    `)
  })
})
