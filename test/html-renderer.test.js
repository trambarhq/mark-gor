import { expect } from 'chai';

import { HtmlRenderer } from '../src/html-renderer.mjs';

describe('HtmlRenderer', function() {
  describe('#outputHtmlElement()', function() {
    it ('should not add an end tag to a <br>', function() {
      const renderer = new HtmlRenderer;
      const token = {
        tagName: 'br',
        attributes: {},
      };
      const html = renderer.outputHtmlElement(token);
      expect(html).to.equal('<br>');
    })
    it ('should escape prop value', function() {
      const renderer = new HtmlRenderer;
      const token = {
        tagName: 'img',
        attributes: { src: 'hk-mp5.jpg', title: 'Heckler & Koch MP5' },
      };
      const html = renderer.outputHtmlElement(token);
      expect(html).to.equal('<img src="hk-mp5.jpg" title="Heckler &amp; Koch MP5">');
    })
  })
  describe('#outputText', function() {
    it ('should escape text string', function() {
      const renderer = new HtmlRenderer;
      const token = {
        text: 'Heckler & Koch MP5'
      };
      const html = renderer.outputText(token);
      expect(html).to.equal('Heckler &amp; Koch MP5');
    })
  })
  describe('#renderCode()', function() {
    it ('should use the "highlighted" prop when available', function() {
      const renderer = new HtmlRenderer;
      const token = {
        type: 'code',
        text: 'print("Hello world");',
        highlighted: '<span>print(<em>"Hello world"</em>)</span>',
      };
      const html = renderer.render([ token ]);
      expect(html).to.equal('<pre><code><span>print(<em>"Hello world"</em>)</span></code></pre>');
    })
  })
})
