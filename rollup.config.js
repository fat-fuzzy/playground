import path from 'path'
import sveltePreprocess from 'svelte-preprocess'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import url from '@rollup/plugin-url'
import pkg from './package.json'

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/index.js',
	output: { 
    name,
    sourcemap: true,
    file: pkg.main, 
    format: 'es' 
  },
	plugins: [
    replace({
      preventAssignment: true,
      values:{
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      },
    }),
		svelte({
      compilerOptions: {
        dev,
        hydratable: true,
      },
      emitCss: false
    }),
    url({
      sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
      publicPath: '/public/'
    }),
		resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    !dev && terser({
      module: true
    })
	]
};
