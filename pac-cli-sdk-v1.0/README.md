# 关于编译后的代码

为了适配各种环境，分别打出了多个包。

### sdk包的目录结构

```javascript
├── dist
│   ├── *.cjs.js // commonjs规范的包
│   ├── *.es.js // ES Module规范的包
│   ├── *.min.js // IIFE规范的包，可以直接通过<script></script>引入
│   └── *.umd.js // umd规范的包
```

`main`指向的是`*.umd.js`，`module`指向的是`*.es.js`，如果有特殊需求可以直接指定文件来引入，例如：

```javascript
import Test from 'test/dist/test.cjs.js'
```

# 说明

1、为了避免`npm`包的代码和项目的代码出现冗余情况，所有定义在`dependencies`下的的包，都不会被直接打进去，除此之外的代码都会以静态的方式带包进去。当然`*.min.js`包除外，这个包是一个完整的包，是可以独自以`<script></script>`引用的。例如：

```javascript
// index.js
import $ from 'jquery'
import { isObject } from './utils.js'
```

输出的代码如下：

```javascript
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('core-js/modules/es.date.to-string'), require('core-js/modules/es.object.to-string'), require('core-js/modules/es.regexp.to-string')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'core-js/modules/es.date.to-string', 'core-js/modules/es.object.to-string', 'core-js/modules/es.regexp.to-string'], factory) :
  (global = global || self, global.npmtemplate = factory(global.$));
}(this, function ($) { 'use strict';
  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
  }
  var index = {
    $: $,
    isObject: isObject
  };
  return index;
}));
```

2、为了给开发者提供更方便的开发能力，提供了最新的ES6+书写环境，而且也提供了垫片能力(`polyfill`),但是**需要谨慎使用因为这样会增加包的体积**。