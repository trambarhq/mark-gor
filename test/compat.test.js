import { expect } from 'chai';
import {
  parse as parseMarked,
  getDefaults as getMarkedDefaults,
} from 'marked';
import FrontMatter from 'front-matter';

import { parse } from '../src/html.mjs';

const singleTest = '';

const withKnownIssue = [
  'donnemartin-system-design-primer.md',  // can't handle omission of " around attributes
  'nlrx-wjc-learn-vue-source-code.md',    // can't handle omission of " around attributes
  'vuejs-vue.md',                         // can't handle omission of " around attributes
];

function test(desc, requireFunc, params) {
  const mismatchList = [];
  after(function() {
    if (mismatchList.length > 0) {
      console.log(`${mismatchList.length} whitespace or entity mismatches:`);
      console.log(mismatchList);
    }
  })
  describe(desc, function() {
    const tests = [];
    const paths = requireFunc.keys();
    for (let path of paths) {
      if (params.commonmark) {
        const items = requireFunc(path);
        const options = { ...getMarkedDefaults(), ...params.options, silent: true };
        for (let item of items) {
          const { markdown, example, section } = item;
          const title = `example ${(example + '').padStart(3, '0')} (${section})`;
          if (singleTest && !title.startsWith(singleTest)) {
            continue;
          }
          const html = parseMarked(markdown);
          tests.push({ title, markdown, options, html });
        }
      } else {
        const title = path.substr(path.lastIndexOf('/') + 1);
        if (singleTest && !title.startsWith(singleTest)) {
          continue;
        }
        const module = requireFunc(path);
        let options = { ...getMarkedDefaults(), ...params.options, silent: true };
        let markdown = module.default;
        if (params.frontMatter) {
          const fm = FrontMatter(markdown);
          options = { ...options, ...fm.attributes };
          markdown = fm.body;
          if (options.sanitizer) {
            options.sanitizer = eval(options.sanitizer);
          }
        }
        const html = parseMarked(markdown, options);
        tests.push({ title, markdown, options, html });
      }
    }
    for (let { title, markdown, options, html } of tests) {
      if (withKnownIssue.indexOf(title) !== -1) {
        continue;
      }
      describe(`#${title}`, function() {
        it ('should produce the expected output', function() {
          const ourOptions = { ...options, normalizeTags: false, decodeEntities: false };
          let ours = parse(markdown, ourOptions);
          let theirs = html;
          if (ours !== theirs) {
            if (true && processThruDOM(ours) === processThruDOM(theirs)) {
              mismatchList.push(title);
            } else {
              if (singleTest) {
                console.log(`MARKDOWN:\n${markdown}\n`);
                console.log(`OURS:\n${ours}\n`);
                console.log(`THEIRS:\n${theirs}\n`);
              }
              expect.fail('Not matching');
            }
          }
        });
      });
    }
  });
}

function processThruDOM(html) {
  const div = document.createElement('DIV');
  div.innerHTML = html;
  return div.innerHTML;
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
    options: { mangle: false,  }
  });
  test('Commonmark', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
  });
})
