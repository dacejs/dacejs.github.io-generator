---
id: plugins
title: 插件
---

插件可以用来修改 dace 的 webpack 配置项。

和单纯修改 `dace.config.js` 相比，插件的优势在于封装性好、使用简单。

## 约定

- 插件名以 `dace-plugin-` 开头。
- 使用时可以省略插件名称中的 `dace-plugin-`。
- 插件导出的模块中必须包含 `modify()` 方法，`modify()` 接收以下参数：
  - config: 已有的 webpack 配置项
  - { target, isDev }
    - target: `web` or `node`
    - isDev: 是否为 dev 环境
  - webpack：webpack 实例
  - { paths }：dace 内置的路径信息

## 使用
在 `dace.config.js` 使用插件：

```js
module.exports = {
  plugins: ['redux'] // 使用 dace-plugin-redux
};
```

## 使用参数
可以给插件传递参数，只需声明插件时传入一个数组即可（类似 babelrc 和 eslintrc）。

```js
plugins: [
  ['redux', {
    middlewares: [
      // ...
    ]
  }]
]
```

## 写一个自己的插件
[参考 dace-plugin-redux](https://github.com/dacejs/dace-plugin-redux/blob/master/src/plugin.js)
