const Babel = require('rollup-plugin-babel');
const Resolve = require('@rollup/plugin-node-resolve');
const CommonJS = require('@rollup/plugin-commonjs');

module.exports = [
  'html',
  'react',
  'preact',
  'reactivate',
  'preactivate'
].map((name) => {
  return {
    input: `src/${name}.mjs`,
    output: {
      file: `./${name}.js`,
      format: 'umd',
      name: 'markGor',
      globals: {
        react: 'React',
        preact: 'Preact',
      }
    },
    plugins: [
      Babel({
        presets: [
          '@babel/env',
        ],
        plugins: [
          '@babel/transform-runtime',
        ],
        runtimeHelpers: true,
      }),
      Resolve({
        only: [ 'marked' ],
      }),
      CommonJS(),
    ]
  };
});
