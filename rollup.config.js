const Babel = require('rollup-plugin-babel');
const Resolve = require('@rollup/plugin-node-resolve');
const CommonJS = require('@rollup/plugin-commonjs');

module.exports = [
  'html',
  'react',
  'preact'
].map((name) => {
  return {
    input: `src/${name}.mjs`,
    output: {
      file: `lib/${name}.js`,
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
        ]
      }),
      Resolve({
        only: [ 'marked' ],
      }),
      CommonJS(),
    ]
  };
});
