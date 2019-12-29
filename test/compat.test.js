import { expect } from 'chai';
import { parse as parseMarked } from 'marked';
import FrontMatter from 'front-matter';
import { decodeEntities } from '../src/html-entities.mjs';

import { parse } from '../src/html.mjs';

const singleTest = '';

const withKnownIssue = [
  'aldanial-cloc.md',                     // missing feature in Marked
  'brettwooldridge-hikaricp.md',          // missing feature in Marked
  'donnemartin-system-design-primer.md',  // can't handle omission of " around attributes
  'doocs-advanced-java.md',               // copyright sign in heading id
  'freecodecamp.md',                      // missing feature in Marked
  'mission-peace-interview.md',           // missing feature in Marked
  'nlrx-wjc-learn-vue-source-code.md',    // can't handle omission of " around attributes
];

function test(desc, requireFunc, params) {
  describe(desc, function() {
    const paths = requireFunc.keys();
    for (let path of paths) {
      const filename = path.substr(path.lastIndexOf('/') + 1);
      if (filename !== singleTest && singleTest) {
        continue;
      }
      if (withKnownIssue.indexOf(filename) !== -1) {
        continue;
      }
      describe(`#${filename}`, function() {
        it ('should produce the same output as marked', function() {
          const blob = requireFunc(path);
          let markdown = blob.default;
          let { options, frontMatter } = params;
          if (frontMatter) {
            const fm = FrontMatter(markdown);
            options = fm.attributes;
            markdown = fm.body;
            if (options.sanitizer) {
              options.sanitizer = eval(options.sanitizer);
            }
          }
          const html1 = parse(markdown, options);
          const html2 = parseMarked(markdown, options);
          const showDiff = !!singleTest;
          if (!compareHTML(html1, html2, showDiff)) {
            expect.fail('Not matching');
          }
        })
      })
    }
  })
}

function compareHTML(html1, html2, showDiff) {
  html1 = removeSpaceBetween(html1);
  html2 = removeSpaceBetween(html2);
  if (html1 === html2) {
    return true;
  }
  const decoded1 = removeSpaceBetween(decodeEntities(html1));
  const decoded2 = removeSpaceBetween(decodeEntities(html2));
  if (decoded1 === decoded2) {
    return true;
  }
  const trimmed1 = decoded1.replace(/>\s+/g, '>');
  const trimmed2 = decoded2.replace(/>\s+/g, '>');
  if (trimmed1 === trimmed2) {
    return true;
  }
  if (showDiff) {
    console.log(`OURS:\n${html1}\n`);
    console.log(`THEIRS:\n${html2}\n`);
  }
  return false;
}

function removeSpaceBetween(html) {
  return html.replace(/>\s+</g, '><').trim();
}

describe('Compatibility', function() {
  test('Marked specs', require.context('./specs', true, /\.md$/), {
    frontMatter: true,
  });
  test('Marked specs (default options)', require.context('./specs', true, /\.md$/), {
    frontMatter: false,
  });
  test('Marked specs (pedantic)', require.context('./specs', true, /\.md$/), {
    frontMatter: false,
    options: { pedantic: true }
  });
  test('Marked specs (gfm = false)', require.context('./specs', true, /\.md$/), {
    frontMatter: false,
    options: { gfm: false }
  });
  test('GitHub READMEs', require.context('./github', true, /\.md$/), {
    frontMatter: false,
  });
})
