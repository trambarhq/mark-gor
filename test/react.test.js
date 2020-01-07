import { expect } from 'chai';
import { renderToStaticMarkup } from 'react-dom/server';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FrontMatter from 'front-matter';

configure({ adapter: new Adapter() });

import { parse as parseHtml } from '../src/html.mjs';
import { parse as parseReact } from '../src/react.mjs';

const singleTest = '';

const withKnownIssue = [
  'inline_html_advanced',             // invalid inline style
  'sanitizer_bypass',                 // not possible to bypass React security model
  'nlrx-wjc-learn-vue-source-code'    // invalid open attribute
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
        const options = { ...params.options, silent: true };
        for (let item of items) {
          const { markdown, example, section } = item;
          const title = `example ${(example + '').padStart(3, '0')} (${section})`;
          if (singleTest && !title.startsWith(singleTest)) {
            continue;
          }
          const html = parseHtml(markdown, options);
          tests.push({ title, markdown, options, html });
        }
      } else {
        const title = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
        if (singleTest && !title.startsWith(singleTest)) {
          continue;
        }
        const module = requireFunc(path);
        const fm = FrontMatter(module.default);
        const options = { ...params.options, ...fm.attributes, silent: true };
        const markdown = fm.body;
        if (options.sanitizer) {
          options.sanitizer = eval(options.sanitizer);
        }
        const html = parseHtml(markdown, options);
        tests.push({ title, markdown, options, html });
      }
    }
    for (let { title, markdown, options, html } of tests) {
      if (withKnownIssue.indexOf(title) !== -1) {
        continue;
      }
      describe(`#${title}`, function() {
        it ('should produce the expected output', function() {
          const element = parseReact(markdown, options);
          const ours = renderToStaticMarkup(element);
          const theirs = html
            // use hex entity instead of dec for single quote
            .replace(/&#39;/g, '&#x27;')
            // remove 'px' from height and width attributes of <img>
            .replace(/<img\s+.*?>/g, (s) => {
              return s.replace(/\b(width|height)="(\d+)(px|%)"/g, (s, n, v) => {
                return `${n}="${v}"`;
              });
            })
            // remove minor formatting differences with style definition
            .replace(/style="(.*?)"/g, (s, v) => {
              return `style="${v.replace(/\s*([:;])\s*/g, '$1').replace(/;\s*$/, '')}"`;
            });
          if (ours !== theirs && !compareThruDOM(ours, theirs)) {
            if (singleTest) {
              showDiff({ markdown, ours, theirs });
            }
            expect.fail('Not matching');
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

describe('React', function() {
  test('Marked specs', require.context('./specs', true, /\.md$/), {
    options: { mangle: false, xhtml: true }
  });
  test('Commonmark', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { mangle: false, xhtml: true }
  });
  test('GitHub READMEs', require.context('./github', true, /\.md$/), {
    options: { mangle: false, xhtml: true }
  });
})
