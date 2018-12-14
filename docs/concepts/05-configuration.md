---
id: configuration
title: 配置文件
---

配置文件是一个位于工程根目录、命名为 `.dace.config.js` 的文件，文件导出一个模块，模块包含：

## modify()
这是一个修改 dace 默认 webpack 配置项的方法。

`modify()` 包含以下参数：

### config
dace 默认 webpack 配置对象。

### { target, isDev: IS_DEV }
- target：{string} 编译类型，可选值 `web`、 `node`
- isDev：{boolean} 是否为开发环境

### webpack
dace 创建的 webpack 实例。

## plugins
dace 使用的插件类别，传入一个数组。插件名称中的 `dace-plugin-` 可以省略，如下面是使用 dace-plugin-redux 插件的配置。

```js
module.exports = {
  plugins: ['redux']
};
```
