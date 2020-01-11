import { default as React } from 'react';
import { BaseRenderer } from './base-renderer.mjs';
import { convertAttributes } from './attribute-helpers.mjs';

class ReactRenderer extends BaseRenderer {
  constructor(options, props) {
    super(options, props);

    this.outputFunctions = {
      html_tag: this.outputHtmlTag,
      html_element: this.outputHtmlElement,
      text: this.outputText,
      raw: this.outputRaw,
    };
  }

  output() {
    const elements = this.outputTokens(this.tokens);
    return React.createElement(React.Fragment, null, elements);
  }

  outputTokens(tokens) {
    const list = [];
    if (tokens) {
      for (let [ key, token ] of tokens.entries()) {
        const output = this.outputToken(token, key);
        if (output) {
          list.push(output);
        }
      }
    }
    return (list.length > 0) ? list : undefined;
  }

  outputToken(token, key) {
    const f = this.outputFunctions[token.type];
    if (f) {
      return f.call(this, token, key);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Unknown tag type: ${token.type}`);
      }
    }
  }

  outputHtmlTag(token) {
  }

  outputHtmlElement(token, key) {
    if (this.shouldOmit(token)) {
      return;
    }
    const { tagName, attributes, children } = token;
    const props = this.convertAttributes(tagName, attributes);
    const elements = this.outputTokens(children);
    return React.createElement(tagName, { key, ...props }, elements);
  }

  outputText(token) {
    const { text } = token;
    return text;
  }

  outputRaw(token) {
  }

  convertAttributes(tagName, attrs) {
    return convertAttributes(tagName, attrs, { omitInvalidDimensions: false });
  }
}

export {
  ReactRenderer,
  ReactRenderer as default,
};
