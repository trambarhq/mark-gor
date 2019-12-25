import { expect } from 'chai';
import { parse as parseMarked } from 'marked';

import { parse } from '../src/html.mjs';

const requireTestMD = require.context('./specs', true, /\.md$/);
const mdFiles = requireTestMD.keys();

function compareHtml(html1, html2) {
  html1 = html1.replace(/>\n+</g, '><').trim();
  html2 = html2.replace(/>\n+</g, '><').trim();
  if (html1 === html2) {
    return true;
  } else {
    console.log(html1);
    console.log(html2);
    return false;
  }
}

function loadTestMD(path) {
  const blob = requireTestMD(path);
  return blob.default;
}

describe('Compatibility', function() {
  for (let mdFile of mdFiles) {
    const filename = mdFile.substr(mdFile.lastIndexOf('/') + 1);
    if (filename !== 'substitutions.md') {
        //console.log(`Skipping: ${filename}`);
        //continue;
    }
    describe(`#${filename}`, function() {
      it ('should produce the same output as marked', function() {
        const markdown = loadTestMD(mdFile);
        const html1 = parse(markdown);
        const html2 = parseMarked(markdown);
        if (!compareHtml(html1, html2)) {
          expect.fail('Not matching');
        }
      })
    })
  }
})
