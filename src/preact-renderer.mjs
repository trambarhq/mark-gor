import { h } from 'preact';
import { BaseRenderer } from './base-renderer.mjs';

class PreactRenderer extends BaseRenderer {
  createElement(type, props, children) {
    return h(type, props, children);
  }
}

export {
  PreactRenderer,
  PreactRenderer as default,
};
