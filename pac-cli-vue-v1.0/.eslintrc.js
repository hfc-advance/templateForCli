module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 暂时去除 vue v-for 必须设置 key 的 lint
    'vue/require-v-for-key': 'off',
    'vue/valid-v-for': 'off',
    'spaced-comment': 'off',
    'camelcase': 'off'
  }
}
