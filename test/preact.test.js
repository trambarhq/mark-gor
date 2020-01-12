import { expect } from 'chai';
import { render } from 'preact-render-to-string';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import FrontMatter from 'front-matter';

import { parse as parseHtml } from '../src/html.mjs';
import { parse as parsePreact } from '../src/preact.mjs';
import { contentEvictionCheck } from '../src/html-tag-attrs.mjs';

const singleTest = '';

const withKnownIssue = [
  'inline_html_advanced',                           // invalid inline style
  'smartypants_code',                               // script tags are being filtered out
  'sanitizer_bypass_remove_generic',                // not handling sanitizer
  'sanitizer_bypass_remove_tag',                    // not handling sanitizer
  'sanitizer_bypass',                               // not possible to bypass React security model
  'nlrx-wjc-learn-vue-source-code',                 // invalid open attribute
  'cytopia-devilbox',                               // invalid inline style
  'xteve-project-xteve',                            // missing 'px' in inline style
  'juanpe-skeletonview',                            // legacy box-shadow style used
  'mindorksopensource-android-interview-questions', // misformatted table leave bare <tr>
  'microsoft-nni',                                  // border-top specified in reversed fashion
  'example 140 (HTML blocks)',                      // can't create script tag in React
  'example 141 (HTML blocks)',                      // can't create style tag in React
  'example 142 (HTML blocks)',                      // can't create style tag in React
  'example 145 (HTML blocks)',                      // can't create style tag in React
  'example 147 (HTML blocks)',                      // can't create script tag in React
  'example 612 (Raw HTML)',                         // can't replicate completely broken HTML
];

const adapter = new Adapter;

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
          tests.push({ title, markdown, options });
        }
      } else {
        const title = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
        if (singleTest && !title.startsWith(singleTest)) {
          continue;
        }
        const module = requireFunc(path);
        const fm = FrontMatter(module.default);
        const markdown = fm.body.replace(/\u00a0/g, ' ');
        const options = { ...params.options, ...fm.attributes, silent: true };
        if (options.sanitizer) {
          options.sanitizer = eval(options.sanitizer);
        }
        tests.push({ title, markdown, options });
      }
    }
    for (let { title, markdown, options } of tests) {
      if (withKnownIssue.indexOf(title) !== -1) {
        continue;
      }
      describe(`#${title}`, function() {
        it ('should produce the expected output', async function() {
          this.timeout(10000);
          configure({ adapter });

          const theirOptions = {
            ...options,
            normalizeTags: false,
            decodeEntities: false,
            omitLinefeed: true,
          };
          const theirs = parseHtml(markdown, theirOptions);
          const theirDiv = document.createElement('DIV');
          theirDiv.innerHTML = theirs;
          adjustDOMNode(theirDiv);

          const element = parsePreact(markdown, options);
          const ourDiv = document.createElement('DIV');
          const wrapper = mount(element, { attachTo: ourDiv });

          if (!ourDiv.isEqualNode(theirDiv)) {
            // isEqualNode() will return false sometimes even when the
            // contents are a match; React or Enzyme is probably adding
            // something to the node
            ourDiv.innerHTML = ourDiv.innerHTML;
            if (!ourDiv.isEqualNode(theirDiv)) {
              if (singleTest) {
                const ours = render(element);
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
  //console.log(`\n\nOURS:\n\n${ours}\n`);
  //console.log(`\n\nTHEIRS:\n\n${theirs}\n`);
  console.log(`\n\nOURS (DOM):\n\n${ourDOM}\n\n`);
  console.log(`\n\nTHEIRS (DOM):\n\n${theirDOM}\n\n`);
}

function fixDimension(element, name) {
  let value = element.getAttribute(name);
  if (value && !/^\d+$/.test(value)) {
    if (value.endsWith('%')) {
      value = undefined;
    } else {
      const number = parseInt(value);
      value = !isNaN(number) ? number.toString() : undefined;
    }
    if (value !== undefined) {
      element.setAttribute(name, value);
    } else {
      element.removeAttribute(name);
    }
  }
}

function adjustStyles(element) {
  let value = element.getAttribute('style');
  if (value) {
    const orgDefs = value.split(';').filter((s) => !!s.trim());
    const newDefs = [];
    for (let orgDef of orgDefs) {
      const m = /([^:]+):\s*([\s\S]+)/.exec(orgDef.trim());
      if (m) {
        let name = m[1], decl = m[2];
        // remove important
        decl = decl.replace(/\s*!important/, '');
        // change 0 to 0px
        decl = decl.replace(/\b0(\s|;|$)/g, '0px$1');
        // insert space after common in rgb(...)
        decl = decl.replace(/\b(rgba?)\((.*)\)/g, (s, f, a) => {
          const args = a.split(/\s*,\s*/);
          return `${f}(${args.join(', ')})`;
        });
        newDefs.push(`${name}: ${decl}`);
      }
    }
    if (newDefs.length > 0) {
      value = newDefs.join('; ') + ';';
    } else {
      value = '';
    }
    element.setAttribute('style', value);
  }
}

function adjustDOMNode(element) {
  adjustStyles(element);
  if (element.tagName === 'IMG') {
    fixDimension(element, 'width');
    fixDimension(element, 'height');
  }

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
      adjustDOMNode(c);
    }
    c = n;
  }
}

describe('Preact', function() {
  test('Marked specs', require.context('./specs', true, /\.md$/), {
    options: { mangle: false }
  })
  test('Commonmark', require.context('./specs/commonmark', true, /\.json/), {
    commonmark: true,
    options: { mangle: false }
  })
  test('GitHub READMEs', require.context('./github', true, /\.md$/), {
    options: { mangle: false }
  })
})
