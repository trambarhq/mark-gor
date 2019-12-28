import { expect } from 'chai';
import { parse as parseMarked } from 'marked';
import FrontMatter from 'front-matter';
import HTMLEntities from 'html-entities';
import * as JSDiff from 'diff';

import { parse } from '../src/html.mjs';

const singleTest = '';

function test(desc, requireFunc, params) {
  describe(desc, function() {
    const paths = requireFunc.keys();
    for (let path of paths) {
      const filename = path.substr(path.lastIndexOf('/') + 1);
      if (filename !== singleTest && singleTest) {
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
  html1 = html1.replace(/>\s+</g, '><').trim();
  html2 = html2.replace(/>\s+</g, '><').trim();
  if (html1 === html2) {
    return true;
  }
  const decoded1 = HTMLEntities.Html5Entities.decode(html1);
  const decoded2 = HTMLEntities.Html5Entities.decode(html2);
  if (decoded1 === decoded2) {
    return true;
  }
  if (showDiff) {
    const diff = JSDiff.diffChars(html2, html1);
    for (let part of diff) {
      let text = part.value;
      if (part.added) {
        console.log(`OURS: ${text}`);
      } else if (part.removed) {
        console.log(`THEIRS: ${text}`);
      }
    }
  }
  return false;
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
