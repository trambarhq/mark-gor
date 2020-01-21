import { expect } from 'chai';
import {
  parse as parseMarked,
  getDefaults as getMarkedDefaults,
} from 'marked';
import FrontMatter from 'front-matter';

import { parse } from '../src/html.mjs';

const singleTest = '';

const withKnownIssue = [
  'nlrx-wjc-learn-vue-source-code',       // omission of leading " leads to incorrect URL in marked
  'example 128 (HTML blocks)',            // markdown results in broken HTML
  'zeromq-libzmq',                        // unclosed <a> tag disables autolinks
  'bregman-arie-devops-exercises',        // marked is unescaping \? in code sections
  'nuwave-lighthouse',                    // omission of leading " leads to incorrect URL in marked
  'owen0o0-webstack',                     // code fences not correctly captured
];

function test(desc, requireFunc, params) {
  const mismatchList = [];
  after(function() {
    if (mismatchList.length > 0) {
      console.warn(`During "${desc}", ${mismatchList.length} whitespace or entity mismatches:`);
      for (let mismatch of mismatchList) {
        console.warn(mismatch.title);
        if (singleTest) {
          showDiff(mismatch);
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
          tests.push({ title, markdown, options });
        }
      } else {
        const title = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
        if (singleTest && !title.startsWith(singleTest)) {
          continue;
        }
        const module = requireFunc(path);
        const fm = FrontMatter(module.default);
        const markdown = fm.body;
        const options = { ...getMarkedDefaults(), ...params.options, ...fm.attributes, silent: true };
        if (options.sanitizer) {
          options.sanitizer = eval(options.sanitizer);
        }
        tests.push({ title, markdown, options });
      }
    }
    for (let test of tests) {
      const { title, markdown, options, html } = test;
      if (withKnownIssue.indexOf(title) !== -1) {
        continue;
      }
      describe(`#${title}`, function() {
        it ('should produce the expected output', async function() {
          const theirs = parseMarked(markdown, options);
          const ourOptions = {
            ...options,
            headerFormat: 'marked',
            normalizeTags: false,
            decodeEntities: false,
            omitLinefeed: false,
            omitDeclarations: false,
            omitEmbeddedCode: false,
          };
          const ours = parse(markdown, ourOptions);
          if (ours !== theirs) {
            const ourDiv = document.createElement('DIV');
            const theirDiv = document.createElement('DIV');
            ourDiv.innerHTML = ours;
            theirDiv.innerHTML = theirs;
            adjustDOMNode(theirDiv);

            const ourDOM = ourDiv.innerHTML;
            const theirDOM = theirDiv.innerHTML;
            if (ourDiv.isEqualNode(theirDiv)) {
              mismatchList.push({ title, markdown, ours, theirs, ourDOM, theirDOM });
            } else {
              if (singleTest) {
                showDiff({ markdown, ours, theirs, ourDOM, theirDOM });
              }
              expect.fail('Not matching');
            }
          }
        });
      });
    }
  });
}

function showDiff(results) {
  const { markdown, ours, theirs, ourDOM, theirDOM } = results;
  //console.log(`\n\nMARKDOWN:\n\n${markdown}\n`);
  //console.log(`\n\nOURS:\n\n${ours}\n`);
  //console.log(`\n\nTHEIRS:\n\n${theirs}\n`);
  console.log(`\n\nOURS (DOM):\n\n${ourDOM}\n\n`);
  console.log(`\n\nTHEIRS (DOM):\n\n${theirDOM}\n\n`);
}

function adjustDOMNode(element) {
  // remove attributes with garbage names
  for (let attr of element.attributes) {
    if (!/^[\w\-]+$/.test(attr.name)) {
      element.removeAttribute(attr.name);
    }
  }

  let c = element.firstChild;
  while (c) {
    let n = c.nextSibling;
    if (c.nodeType === 1) {
      adjustDOMNode(c);
    }
    c = n;
  }
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
