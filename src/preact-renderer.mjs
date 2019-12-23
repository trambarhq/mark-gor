import { h } from 'preact';
import { JSONRenderer } from './json-renderer.mjs';

class PreactRenderer extends JSONRenderer {
  createElement(type, props, children) {
    return h(type, props, children);
  }
}

export {
  PreactRenderer,
  PreactRenderer as default,
};
