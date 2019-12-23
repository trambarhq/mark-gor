import { expect } from 'chai';

import { HtmlRenderer } from '../src/html-renderer.mjs';

describe('HtmlRenderer', function() {
  describe('#createElement()', function() {
    it ('should not add an end tag to a <br>', function() {
      const renderer = new HtmlRenderer;
      const html = renderer.createElement('br', null) + '';
      expect(html).to.equal('<br>');
    })
    it ('should escape prop value', function() {
      const renderer = new HtmlRenderer;
      const props = { src: 'hk-mp5.jpg', title: 'Heckler & Koch MP5' }
      const html = renderer.createElement('img', props) + '';
      expect(html).to.equal('<img src="hk-mp5.jpg" title="Heckler &amp; Koch MP5">');
    })
    it ('should escape text string', function() {
      const renderer = new HtmlRenderer;
      const html = renderer.createElement('li', null, 'Heckler & Koch MP5') + '';
      expect(html).to.equal('<li>Heckler &amp; Koch MP5</li>');
    })
    it ('should not escape boxed string', function() {
      const renderer = new HtmlRenderer;
      const child = new String('<a href="#foo">Hello world</a>');
      const html = renderer.createElement('li', null, [ child ]) + '';
      expect(html).to.equal('<li><a href="#foo">Hello world</a></li>');
    })
  })
})
