import filesize from 'rollup-plugin-filesize'
import { name, version, author } from '../package.json'
import config from './rollup.config.base.js'
import minify from 'rollup-plugin-minify-es'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
const { rollupMerge } = require('./utils.js')
const postcssConfig = require('../postcss.config.js')

let banner = `${'/*!\n' + ' * '}🏆${name}.js v${version}🏆\n` +
            ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
            ` * Released under the MIT License.\n` +
            ` */`

const outArrays = [
  { format: 'umd', name: `dist/lib-vw/${name}.umd.js`, unplugins: ['postcss-pxtorem'] },
  { format: 'es',  name: `dist/lib-vw/${name}.es.js`, unplugins: ['postcss-pxtorem'] },
  { format: 'umd',  name: `dist/lib-px/${name}.umd.js`, unplugins: ['postcss-px-to-viewport', 'postcss-pxtorem']  },
  { format: 'es',  name: `dist/lib-px/${name}.es.js`, unplugins: ['postcss-px-to-viewport', 'postcss-pxtorem']  },
  { format: 'umd',  name: `dist/lib-rem/${name}.umd.js`, unplugins: ['postcss-px-to-viewport']   },
  { format: 'es',  name: `dist/lib-rem/${name}.es.js`, unplugins: ['postcss-px-to-viewport']  }
]

module.exports = outArrays.map(item => {
  let currentVueConfig = {
  }
  const currentConfig = {
    input: 'src/index.vue',
    output: {
      file: item.name,
      format: item.format,
      name,
      banner
    },
    plugins: [
      filesize(),
      vue({
        compileTemplate: true,
        // styleToImports: true,
        css: true,
        style: {
          postcssPlugins: postcssConfig.plugins.filter(({ postcssPlugin = '' }) => !item.unplugins.includes(postcssPlugin))
        }
      }),
      css()
    ]
  }
  if (item.minify) {
    currentConfig.plugins.push(minify())
  }

  let result = rollupMerge(config, currentConfig)
  if (item.format === 'iife') {
    delete result.external
  }
  return result
})