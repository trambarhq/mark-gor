import { expect } from 'chai';
import Prism from 'prismjs';

import { Parser, parse } from '../html.mjs';

describe('Parser', function() {
  it ('should process both block and inline tokens', function() {
    const parser = new Parser;
    const text = `
* This should be
* An unordered list

1. This should be
2. An unordered list
    `;
    const tokens = parser.parse(text);
    expect(tokens).to.have.lengthOf(2);
    expect(tokens[0]).to.have.property('type', 'list');
    expect(tokens[0]).to.have.property('ordered', false);
    expect(tokens[0].children).to.have.lengthOf(2);
    expect(tokens[1]).to.have.property('type', 'list');
    expect(tokens[1]).to.have.property('ordered', true);
    const items = tokens[1].children;
    expect(items).to.have.lengthOf(2);
    expect(items[0]).to.have.property('type', 'list_item');
    const content = items[0].children[0];
    expect(content).to.have.property('type', 'text_block');
  })
  it ('should highlight code using provided function', function() {
    const highlight = (code, language) => {
      return Prism.highlight(code, Prism.languages[language], language);
    };
    const text = `
\`\`\`javascript
const hello = "world";
\`\`\`
    `;
    const html = parse(text, { highlight });
    expect(html).to.equal('<pre><code class="language-javascript"><span class="token keyword">const</span> hello <span class="token operator">=</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span></code></pre>');
  })
})
