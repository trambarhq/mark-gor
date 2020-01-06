import { expect } from 'chai';

import { Parser } from '../src/parser.mjs';

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
})
