import { expect } from 'chai';

import { findTextStrings, findCodeSections, Parser } from '../react.mjs';

describe('Helpers', function() {
  describe('#findTextStrings', function() {
    it ('should find text tokens', function() {
      const parser = new Parser;
      const markdown = `
Heading level 1
===============

I really like using Markdown.

I just love **bold text**.

- First item
- Second item
- Third item
- Fourth item

![Tux, the Linux mascot](/assets/images/tux.png)

<h1>Embedded HTML</h1>`;
      const tokens = parser.parse(markdown);
      const strings = findTextStrings(tokens);
      console.log(strings);
      expect(strings).to.deep.equal([
        'Heading level 1',
        'I really like using Markdown.',
        'I just love ',
        'bold text',
        '.',
        'First item',
        'Second item',
        'Third item',
        'Fourth item',
        'Tux, the Linux mascot',
        'Embedded HTML'
      ]);
    })
  })
})
