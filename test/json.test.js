import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FrontMatter from 'front-matter';

import { Parser, JsonRenderer, ReactRenderer } from '../src/react.mjs';
import { reactivate } from '../src/reactivate.mjs';

const singleTest = '';

const adapter = new Adapter;

function test(desc, requireFunc, params) {
  describe(desc, function() {
    const tests = [];
    const paths = requireFunc.keys();
    for (let path of paths) {
      if (params.commonmark) {
        const items = requireFunc(path);
        for (let item of items) {
          const options = { ...params.options, silent: true };
          const { markdown, example, section, html: expected } = item;
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
        const options = { ...params.options, ...fm.attributes, silent: true };
        const markdown = fm.body.replace(/\u00a0/g, ' ');
        tests.push({ title, markdown, options });
      }
    }
    for (let { title, markdown, options } of tests) {
      describe(`#${title}`, function() {
        it ('should produce the same output after reactivation', function() {
          this.timeout(5000);
          configure({ adapter });

          const parser = new Parser(options);
          const jsonRenderer = new JsonRenderer(options);
          const reactRenderer = new ReactRenderer(options);
          const tokens = parser.parse(markdown);

          const theirElement = reactRenderer.render(tokens);
          const theirDiv = document.createElement('DIV');
          const theirWrapper = mount(theirElement, { attachTo: theirDiv });

          const json = jsonRenderer.render(tokens);
          const ourElement = reactivate(json);
          const ourDiv = document.createElement('DIV');
          const ourWrapper = mount(ourElement, { attachTo: ourDiv });

          if (!ourDiv.isEqualNode(theirDiv)) {
            if (singleTest) {
              showDiff({
                markdown,
                ourDOM: ourDiv.innerHTML,
                theirDOM: theirDiv.innerHTML,
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
  const { markdown, ourDOM, theirDOM } = results;
  //console.log(`\n\nMARKDOWN:\n\n${markdown}\n`);
  console.log(`\n\nOURS (DOM):\n\n${ourDOM}\n\n`);
  console.log(`\n\nTHEIRS (DOM):\n\n${theirDOM}\n\n`);
}

describe('JSON', function() {
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
