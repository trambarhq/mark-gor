import { expect } from 'chai';
import { parse as parseMarked } from 'marked';

import { parse } from '../src/html.mjs';

const requireTestMD = require.context('./specs', true, /\.md$/);
const mdFiles = requireTestMD.keys();

function removeExtraSpace(html) {
  return html.replace(/>\n+</g, '><').trim();
}

function loadTestMD(path) {
  const blob = requireTestMD(path);
  return blob.default;
}

const singleTest = 'headings_id.md';

describe('Compatibility', function() {
  for (let mdFile of mdFiles) {
    const filename = mdFile.substr(mdFile.lastIndexOf('/') + 1);
    if (filename !== singleTest && singleTest) {
        continue;
    }
    describe(`#${filename}`, function() {
      it ('should produce the same output as marked', function() {
        const markdown = loadTestMD(mdFile);
        const html1 = removeExtraSpace(parse(markdown));
        const html2 = removeExtraSpace(parseMarked(markdown));
        if (html1 !== html2) {
          if (singleTest) {
            console.log(markdown);
            console.log(html1);
            console.log(html2);
          }
          expect.fail('Not matching');
        }
      })
    })
  }
})
