const browsers = require('./package.json').browserslist || ["> 1%", "last 2 versions", "not ie <= 8"]
module.exports = {
  plugins: [
    require("autoprefixer")({ browsers }),
    require("postcss-px-to-viewport")({
      // TODO: 可以根据UI修改此属性，详细文档可以参考:https://www.npmjs.com/package/postcss-px-to-viewport
      viewportWidth: 375,
      unitPrecision: 5
    }),
    // TODO: 可以结合项目修改此属性，详细文档可以参考:https://www.npmjs.com/package/postcss-pxtorem
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      unitPrecision: 5
    })
  ]
}