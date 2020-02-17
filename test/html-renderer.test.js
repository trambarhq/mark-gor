import { expect } from 'chai';

import { HTMLRenderer, Parser } from '../html.mjs';

describe('HTMLRenderer', function() {
  describe('#outputHTMLElement()', function() {
    it ('should not add an end tag to a <br>', function() {
      const renderer = new HTMLRenderer;
      const token = {
        tagName: 'br',
        attributes: {},
      };
      const html = renderer.outputHTMLElement(token);
      expect(html).to.equal('<br>');
    })
    it ('should escape prop value', function() {
      const renderer = new HTMLRenderer;
      const token = {
        tagName: 'img',
        attributes: { src: 'hk-mp5.jpg', title: 'Heckler & Koch MP5' },
      };
      const html = renderer.outputHTMLElement(token);
      expect(html).to.equal('<img src="hk-mp5.jpg" title="Heckler &amp; Koch MP5">');
    })
  })
  describe('#outputText', function() {
    it ('should escape text string', function() {
      const renderer = new HTMLRenderer;
      const token = {
        text: 'Heckler & Koch MP5'
      };
      const html = renderer.outputText(token);
      expect(html).to.equal('Heckler &amp; Koch MP5');
    })
  })
  describe('#renderCode()', function() {
    it ('should use the children prop when available', function() {
      const parser = new Parser({ htmlOnly: true });
      const code = '<span>print(<em>"Hello world"</em>)</span>';
      const codeTokens = parser.parse(code);
      const renderer = new HTMLRenderer;
      const token = {
        type: 'code',
        text: 'print("Hello world");',
        children: codeTokens,
      };
      const html = renderer.render([ token ]);
      expect(html).to.equal('<pre><code><span>print(<em>&quot;Hello world&quot;</em>)</span></code></pre>');
    })
  })
})
