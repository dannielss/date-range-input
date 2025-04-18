import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import analyze from 'rollup-plugin-analyzer';

export default {
  input: 'index.ts',
  output: [
    { file: 'dist/index.js', format: 'cjs', sourcemap: true },
    { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({
      babelHelpers: 'bundled',
    }),
    postcss({
      extract: true,
      inject: true,
      minimize: true,
    }),
    terser(),
    analyze({
      summaryOnly: true,
    }),
  ],
  external: ['react', 'react-dom'],
};
