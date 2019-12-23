import { React } from 'react';
import { BaseRenderer } from './base-renderer.mjs';

class ReactRenderer extends BaseRenderer {
  constructor(options, extra) {
    super(options, extra);

    this.nextKey = 0;
    this.keyStack = [];
  }

  createElement(type, props, children) {
    const key = this.nextKey++;
    return React.createElement(type, { key, ...props }, children);
  }

  renderTokens(token) {
    this.keyStack.push(this.nextKey);
    this.nextKey = 0;
    const elements = super.renderTokens(token);
    this.nextKey = this.keyStack.pop();
    return elements;
  }
}

export {
  ReactRenderer,
  ReactRenderer as default,
};
