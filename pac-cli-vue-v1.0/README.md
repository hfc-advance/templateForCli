## 特色

1、采用`babel7`新选项`usage`，可以不用手动引入垫片，不用担心引入过多的垫片导致包体积变大，可以放心的使用**ES6+**

2、采用`core-js3`，更优的代码，更多的方法可以使用，比如以下这些：

- 装饰器

```javascript
class MyClass {
  @decorator
  method() {}
}
```

- 私有属性和方法

```javascript
class C {
  static #foo = "bar";
}

class Person {
  #age = 19;

  #increaseAge() {
    this.#age++;
  }

  birthday() {
    this.#increaseAge();
    alert("Happy Birthday!");
  }
}
```

- 管道符

## 关于编译后的代码

1、为了保证npm包的代码和项目的代码出现冗余情况，所有定义在`dependencies`下的的包，都不会被直接打进去，除此之外的代码都会以静态的方式带包进去。当然`*.min.js`包除外，这个包是一个完整的包，是可以独自以`<script></script>`引用的。

**如下**

```javascript
// index.js
import $ from 'jquery'
import { isObject } from './utils.js'
```

**将得到下面的结果**

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

2、输出包如下所示：

包名 | 规范 | 是否压缩 | 说明
---|---|---|---
*.cjs.js | CommonJS | 否 | ---
*.es.js | ES Module(供构建工具使用) | 否 | module的指向文件，如果构建工具可以识别npm的module属性，那么引用的就是该文件
*.umd.js | UMD | 否 | main的指向文件，不识别module属性，那么引用的就是该文件
*.min.js | IIFE | 是 | 浏览器直接通过script标签引用的文件，不包含任何依赖项

