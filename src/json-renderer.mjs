import { BaseRenderer } from './base-renderer.mjs';

class JsonRenderer extends BaseRenderer {
  createElement(type, props, children) {
    const el = { type };
    if (props) {
      el.props = props;
    }
    if (children) {
      el.children = children;
    }
    return el;
  }

  render(tokens) {
    return this.renderTokens(tokens);
  }
}

export {
  JsonRenderer,
  JsonRenderer as default,
};
