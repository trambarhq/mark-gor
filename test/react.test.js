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
  'nlrx-wjc-learn-vue-source-code',   // invalid open attribute
  'cytopia-devilbox',                 // invalid inline style
  'example 140 (HTML blocks)',        // can't create script tag in React
  'example 141 (HTML blocks)',        // can't create style tag in React
  'example 142 (HTML blocks)',        // can't create style tag in React
  'example 145 (HTML blocks)',        // can't create style tag in React
  'example 147 (HTML blocks)',        // can't create script tag in React
  'example 612 (Raw HTML)',           // can't replicate completely broken HTML
];

function test(desc, requireFunc, params) {
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
          const theirOptions = {
            ...options,
            normalizeTags: false,
            decodeEntities: false,
            omitLinefeed: true,
          };
          const html = parseHtml(markdown, theirOptions);
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
            // remove minor formatting differences with style definition
            .replace(/style="(.*?)"/g, (s, v) => {
              return `style="${v.replace(/\s*([:;])\s*/g, '$1').replace(/;\s*$/, '')}"`;
            });
          const ourDiv = document.createElement('DIV');
          const theirDiv = document.createElement('DIV');
          ourDiv.innerHTML = ours;
          theirDiv.innerHTML = theirs;

          if (!ourDiv.isEqualNode(theirDiv)) {
            if (singleTest) {
              showDiff({
                markdown,
                ours: ourDiv.innerHTML,
                theirs: theirDiv.innerHTML
              });
            }
            expect.fail('Not matching');
          }
        });
      });
    }
  });
}

function showDiff(results) {
  const { markdown, ours, theirs } = results;
  console.log(`MARKDOWN:\n${markdown}\n`);
  console.log(`OURS:\n${ours}\n`);
  console.log(`THEIRS:\n${theirs}\n`);
}

describe('React', function() {
  test('Marked specs', require.context('./specs', true, /\.md$/), {
    options: { mangle: false }
  });
  test('Commonmark', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { mangle: false }
  });
  test('GitHub READMEs', require.context('./github', true, /\.md$/), {
    options: { mangle: false }
  });
})
