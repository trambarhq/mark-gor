import { expect } from 'chai';
import {
  parse as parseMarked,
  getDefaults as getMarkedDefaults,
} from 'marked';
import FrontMatter from 'front-matter';

import { parse } from '../src/html.mjs';

const singleTest = '';

const withKnownIssue = [
  'nlrx-wjc-learn-vue-source-code',       // omission of leading " leads to incorrect URL
  'example 128 (HTML blocks)',            // markdown results in broken HTML
];

function test(desc, requireFunc, params) {
  const mismatchList = [];
  after(function() {
    if (mismatchList.length > 0) {
      console.warn(`During "${desc}", ${mismatchList.length} whitespace or entity mismatches:`);
      for (let { title, ours, theirs, markdown } of mismatchList) {
        console.warn(title);
        if (singleTest) {
          showDiff({ markdown, ours, theirs });
        }
      }
      console.warn('\n');
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
          const html = parseMarked(markdown, options);
          tests.push({ title, markdown, options, html });
        }
      } else {
        const title = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
        if (singleTest && !title.startsWith(singleTest)) {
          continue;
        }
        const module = requireFunc(path);
        const fm = FrontMatter(module.default);
        const options = { ...getMarkedDefaults(), ...params.options, ...fm.attributes, silent: true };
        const markdown = fm.body;
        if (options.sanitizer) {
          options.sanitizer = eval(options.sanitizer);
        }
        const html = parseMarked(markdown, options);
        tests.push({ title, markdown, options, html });
      }
    }
    for (let test of tests) {
      const { title, markdown, options, html } = test;
      if (withKnownIssue.indexOf(title) !== -1) {
        continue;
      }
      describe(`#${title}`, function() {
        it ('should produce the expected output', function() {
          const ourOptions = {
            ...options,
            normalizeTags: false,
            decodeEntities: false,
            omitLinefeed: false,
            omitDeclarations: false,
            omitEmbeddedCode: false,
          };
          const ours = parse(markdown, ourOptions);
          const theirs = html;
          if (ours !== theirs) {
            if (compareThruDOM(ours, theirs)) {
              mismatchList.push({ title, ours, theirs, markdown });
            } else {
              if (singleTest) {
                showDiff({ markdown, ours, theirs });
              }
              expect.fail('Not matching');
            }
          }
        });
      });
    }
  });
}

function compareThruDOM(ours, theirs) {
  const ourDiv = document.createElement('DIV');
  const theirDiv = document.createElement('DIV');
  ourDiv.innerHTML = ours;
  theirDiv.innerHTML = theirs;
  return ourDiv.isEqualNode(theirDiv);
}

function showDiff(results) {
  const { markdown, ours, theirs } = results;
  console.log(`MARKDOWN:\n${markdown}\n`);
  console.log(`OURS:\n${ours}\n`);
  console.log(`THEIRS:\n${theirs}\n`);
}

describe('Compatibility', function() {
  test('Marked specs', require.context('./specs', true, /\.md$/), {
    options: { mangle: false }
  });
  test('Marked specs (pedantic = true)', require.context('./specs', true, /\.md$/), {
    options: { mangle: false, pedantic: true }
  });
  test('Marked specs (gfm = false)', require.context('./specs', true, /\.md$/), {
    options: { mangle: false, gfm: false }
  });
  test('Commonmark', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { mangle: false, fixBrokenTags: false }
  });
  test('Commonmark (pedantic = true)', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { mangle: false, fixBrokenTags: false, pedantic: true }
  });
  test('Commonmark (gfm = false)', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { mangle: false, fixBrokenTags: false, gfm: false }
  });
  test('GitHub READMEs', require.context('./github', true, /\.md$/), {
    options: { mangle: false }
  });
})
