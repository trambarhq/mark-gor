import { expect } from 'chai';
import { parse as parseMarked } from 'marked';
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
    const paths = requireFunc.keys();
    for (let path of paths) {
      if (params.commonmark) {
        const module = requireFunc(path);
        const tests = module;
        const { options } = params;
        for (let test of tests) {
          const { markdown, html, example, section } = test;
          describe(`#Example ${example} (${section})`, function() {
            it ('should produce the expected result', function() {
              const ours = parse(markdown, options);
              const theirs = html;
              if (ours !== theirs) {
                console.log(`OURS:\n${ours}\n`);
                console.log(`THEIRS:\n${theirs}\n`);
                expect.fail('Not matching');
              }
            })
          })
        }
      } else {
        const filename = path.substr(path.lastIndexOf('/') + 1);
        if (filename !== singleTest && singleTest) {
          continue;
        }
        if (withKnownIssue.indexOf(filename) !== -1) {
          continue;
        }
        describe(`#${filename}`, function() {
          it ('should produce the same output as marked', function() {
            const module = requireFunc(path);
            let markdown = module.default;
            let { options, frontMatter } = params;
            if (frontMatter) {
              const fm = FrontMatter(markdown);
              options = fm.attributes;
              markdown = fm.body;
              if (options.sanitizer) {
                options.sanitizer = eval(options.sanitizer);
              }
            }
            const ours = parse(markdown, options);
            const theirs = parseMarked(markdown, options);
            const showDiff = !!singleTest;
            if (!compareHTML(ours, theirs, showDiff)) {
              expect.fail('Not matching');
            }
          })
        })
      }
    }
  })
}

function compareHTML(ours, theirs, showDiff) {
  if (ours === theirs) {
    return true;
  }
  const oursAfter = processThruDOM(ours);
  const theirsAfter = processThruDOM(theirs);
  if (oursAfter === theirsAfter) {
    return true;
  }
  if (showDiff) {
    console.log(`OURS:\n${oursAfter}\n`);
    console.log(`THEIRS:\n${theirsAfter}\n`);
  }
  return false;
}

function removeSpaceBetween(html) {
  return html.replace(/>[ \n\r\t]+</g, '><').trim();
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
  });
  test('Commonmark', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { gfm: false, pedantic: false, headerIds: false }
  });
})
