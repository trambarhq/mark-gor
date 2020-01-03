import { expect } from 'chai';
import {
  parse as parseMarked,
  getDefaults as getMarkedDefaults,
} from 'marked';
import FrontMatter from 'front-matter';

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
    const tests = [];
    const paths = requireFunc.keys();
    for (let path of paths) {
      if (params.commonmark) {
        const items = requireFunc(path);
        const options = { gfm: false, pedantic: false, headerIds: false };
        for (let { markdown, html, example, section } of items) {
          const title = `example ${example} (${section})`;
          tests.push({ title, markdown, options, html });
        }
      } else {
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
        const title = path.substr(path.lastIndexOf('/') + 1);
        tests.push({ title, markdown, options, html });
      }
    }
    for (let { title, markdown, options, html } of tests) {
      if (singleTest && title !== singleTest) {
        continue;
      }
      if (withKnownIssue.indexOf(title) !== -1) {
        continue;
      }
      describe(`#${title}`, function() {
        it ('should produce the expected output', function() {
          const ourOptions = { ...options, decodeEntities: false };
          let ours = parse(markdown, ourOptions);
          let theirs = html;
          if (ours !== theirs) {
            if (singleTest) {
              //console.log(`MARKDOWN:\n${markdown}\n`);
              //console.log(`OURS:\n${ours}\n`);
              //console.log(`THEIRS:\n${theirs}\n`);
            }
            expect.fail('Not matching');
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
/*
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
  test('Commonmark', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { gfm: false, pedantic: false, headerIds: false }
  });
*/
})
