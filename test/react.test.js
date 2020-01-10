import { expect } from 'chai';
import { renderToStaticMarkup } from 'react-dom/server';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FrontMatter from 'front-matter';

configure({ adapter: new Adapter() });

import { parse as parseMarked } from 'marked';
import { parse as parseHtml } from '../src/html.mjs';
import { parse as parseReact } from '../src/react.mjs';
import { contentEvictionCheck } from '../src/html-tag-attrs.mjs';

const singleTest = '';

const withKnownIssue = [
  'inline_html_advanced',             // invalid inline style
  'smartypants_code',                 // script tags are being filtered out
  'sanitizer_bypass_remove_generic',  // not handling sanitizer
  'sanitizer_bypass_remove_tag',      // not handling sanitizer
  'sanitizer_bypass',                 // not possible to bypass React security model
  'nlrx-wjc-learn-vue-source-code',   // invalid open attribute
  'cytopia-devilbox',                 // invalid inline style
  'xteve-project-xteve',              // missing 'px' in inline style
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
          const { markdown, example, section, html: expected } = item;
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
        const theirOptions = {
          ...options,
          normalizeTags: false,
          decodeEntities: false,
          omitLinefeed: true,
        };
        const html = parseHtml(markdown, theirOptions);
        tests.push({ title, markdown, options, html });
      }
    }
    for (let { title, markdown, options, html } of tests) {
      if (withKnownIssue.indexOf(title) !== -1) {
        continue;
      }
      describe(`#${title}`, function() {
        it ('should produce the expected output', function() {
          const theirs = html
            // use hex entity instead of dec for single quote
            .replace(/&#39;/g, '&#x27;')
            .replace(/style="(.*?)"/g, (s, v) => {
              // remove minor formatting differences with style definition
              v = v.replace(/\s*([:;])\s*/g, '$1 ');
              // remove important
              v = v.replace(/\s*!important/g, '');
              // change 0 to 0px
              v = v.replace(/\b0(\s|;|$)/g, '0px$1');
              v = v.trim();
              if (!/;$/.test(v)) {
                v += ';';
              }
              return `style="${v}"`;
            });
          const theirDiv = document.createElement('DIV');
          theirDiv.innerHTML = theirs;
          // get rid of whitespaces between table tags
          filterNonvisualWhitespace(theirDiv);

          const element = parseReact(markdown, options);
          const ourDiv = document.createElement('DIV');
          const wrapper = mount(element, { attachTo: ourDiv });

          if (!ourDiv.isEqualNode(theirDiv)) {
            // isEqualNode() will return false sometimes even when the
            // contents are a match; React or Enzyme is probably adding
            // something to the node
            ourDiv.innerHTML = ourDiv.innerHTML;
            if (!ourDiv.isEqualNode(theirDiv)) {
              if (singleTest) {
                const ours = renderToStaticMarkup(element);
                showDiff({
                  markdown,
                  ours,
                  theirs,
                  ourDOM: ourDiv.innerHTML,
                  theirDOM: theirDiv.innerHTML,
                });
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
  console.log(`\n\nMARKED:\n\n${parseMarked(markdown)}\n`);
  //console.log(`\n\nOURS:\n\n${ours}\n`);
  //console.log(`\n\nTHEIRS:\n\n${theirs}\n`);
  console.log(`\n\nOURS (DOM):\n\n${ourDOM}\n\n`);
  console.log(`\n\nTHEIRS (DOM):\n\n${theirDOM}\n\n`);
}

function filterNonvisualWhitespace(element) {
  const filtering = contentEvictionCheck(element.tagName.toLowerCase());
  let c = element.firstChild;
  while (c) {
    let n = c.nextSibling;
    if (c.nodeType === 3) {
      if (filtering) {
        if (/^\s+$/.test(c.textContent)) {
          c.remove();
        }
      }
    } else if (c.nodeType === 1) {
      filterNonvisualWhitespace(c);
    }
    c = n;
  }
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
