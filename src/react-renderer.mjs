import { default as React } from 'react';
import { BaseRenderer } from './base-renderer.mjs';
import { convertAttributes } from './attribute-helpers.mjs';

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

  convertAttributes(tagName, attrs) {
    return convertAttributes(tagName, attrs);
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

  renderHtmlElement(token) {
    const { tagName, attributes } = token;
    if (this.shouldOmit(tagName, attributes)) {
      return;
    }
    const children = this.renderChildren(token);
    const props = this.convertAttributes(tagName, attributes);
    return this.createElement(tagName, props, children);
  }

  renderHtmlTag(token) {
  }

  renderRaw(token) {
  }
}

export {
  ReactRenderer,
  ReactRenderer as default,
};
