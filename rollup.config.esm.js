import Babel from 'rollup-plugin-babel';
import Resolve from '@rollup/plugin-node-resolve';
import CommonJS from '@rollup/plugin-commonjs';

export default [
  'html',
  'react',
  'preact',
  'reactivate',
  'preactivate',
].map((name) => {
  return {
    input: `src/${name}.mjs`,
    output: {
      file: `./${name}.mjs`,
      format: 'esm'
    },
    plugins: [
      Babel({
        presets: [
          '@babel/env',
        ],
      }),
      Resolve(),
      CommonJS(),
    ],
    external: [ 'react', 'preact' ]
  };
});
