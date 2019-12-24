import { expect } from 'chai';
import { parse as parseMarked } from 'marked';

import { parse } from '../src/html.mjs';

const requireTestMD = require.context('./specs', true, /\.md$/);
const mdFiles = requireTestMD.keys();

function parseRef(markdown) {
  const html = parseMarked(markdown);
  return html.replace(/>\n+</g, '><').trim();
}

function loadTestMD(path) {
  const blob = requireTestMD(path);
  return blob.default;
}

describe('Compatibility', function() {
  for (let mdFile of mdFiles) {
    const filename = mdFile.substr(mdFile.lastIndexOf('/') + 1);
    describe(`#${filename}`, function() {
      it ('should produce the same output as marked', function() {
        const markdown = loadTestMD(mdFile);
        const html1 = parse(markdown);
        const html2 = parseRef(markdown);
        if (html1 !== html2) {
          expect.fail('Not matching');
        }
      })
    })
  }
})
