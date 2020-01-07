import { default as React } from 'react';
import { BaseRenderer } from './base-renderer.mjs';

class ReactRenderer extends BaseRenderer {
  constructor(options, props) {
    super(options, props);

    this.nextKey = 0;
    this.keyStack = [];
  }

  createElement(type, props, children) {
    const key = this.nextKey++;
    return React.createElement(type, { key, ...props }, children);
  }

  render(tokens) {
    this.initialize();
    const elements = this.renderTokens(tokens);
    return React.createElement(React.Fragment, null, elements);
  }

  renderTokens(token) {
    this.keyStack.push(this.nextKey);
    this.nextKey = 0;
    const elements = super.renderTokens(token);
    this.nextKey = this.keyStack.pop();
    return elements;
  }

  renderHtmlTag(token) {
    console.log(token);
  }

  renderRaw(token) {
  }
}

export {
  ReactRenderer,
  ReactRenderer as default,
};
