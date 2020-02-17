import { expect } from 'chai';
import { renderToStaticMarkup } from 'react-dom/server';

import { parse, parseAsync } from '../react.mjs';

const file1 = require('./github/awesome-selfhosted.md');
const file2 = require('./github/request.md');

describe('AsyncParser', function() {
  this.timeout(5000);
  it ('should yield the same result as the synchronous version', async function() {
    const markdown = file2.default;
    const theirElement = parse(markdown);
    const theirs = renderToStaticMarkup(theirElement)
    const ourElement = await parseAsync(markdown);
    const ours = renderToStaticMarkup(theirElement)
    expect(ours).to.equal(theirs);
  })
  it ('should not block for too long', async function() {
    let running = true;
    let lastTime = null;
    let maxDuration = 0;
    let count = 0;
    const tickFunc = () => {
      const now = new Date;
      if (lastTime) {
        const duration = now - lastTime;
        if (duration > maxDuration) {
          maxDuration = duration;
        }
      }
      lastTime = now;
      count++;
      if (running) {
        setImmediate(tickFunc);
      }
    };
    tickFunc();
    const markdown = file1.default;
    const ourElement = await parseAsync(markdown);
    running = false;
    expect(count).to.be.above(1000);
    expect(maxDuration).to.be.below(100);
  })
  it ('should highlight code using provided function', async function() {
    const highlight = async (code, language) => {
      return Prism.highlight(code, Prism.languages[language], language);
    };
    const text = `
\`\`\`javascript
const hello = "world";
\`\`\`
    `;
    const element = await parseAsync(text, { highlight });
    const html = renderToStaticMarkup(element);
    expect(html).to.equal('<pre><code class="language-javascript"><span class="token keyword">const</span> hello <span class="token operator">=</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span></code></pre>');
  })
})
