import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import eslintFormate from 'eslint-friendly-formatter'
import css from 'rollup-plugin-css-only'
import sass from 'rollup-plugin-sass'
import { version, dependencies } from '../package.json'
import vue from 'rollup-plugin-vue'
const vueConfig = require('../.vuerc.js')

export default {
  input: process.env.BUILD_TYPE === 'vue' ? 'src/index.vue' : 'src/index.js',
  plugins: [
    eslint({
      include: ['src/**/*.js', 'src/**/*.vue'],
      formatter: eslintFormate
    }),
    resolve({}),
    commonjs(),
    babel(
      {
        babelrc: true,
        "runtimeHelpers": true
      }
    ),
    vue(vueConfig),
    css(),
    sass(),
    replace({
      VERSION: JSON.stringify(version),
    }),
  ],
  external: id => {
    let keys = Object.keys(dependencies) || []
    for (let key of keys) {
      let reg = new RegExp(`^${key}`)
      if (reg.test(id)) return true
    }
    return false
  }
}
