import { expect } from 'chai';
import { parse as parseMarked } from 'marked';
import FrontMatter from 'front-matter';

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
          const html1 = removeExtraSpace(parse(markdown, options));
          const html2 = removeExtraSpace(parseMarked(markdown, options));
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
}

function removeExtraSpace(html) {
  return html.replace(/>\s+</g, '><').trim();
}

describe('Compatibility', function() {
  test('Marked specs (default options)', require.context('./specs', true, /\.md$/), {
    frontMatter: false,
  });
})
