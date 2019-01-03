---
id: configuration
title: 配置文件
---

配置文件是一个位于工程根目录、命名为 `dace.config.js` 的文件，文件导出一个模块，模块包含：

## 参数配置
    ```
    // 工程根目录
    appRoot: '.',

    // babel 配置文件位置
    appBabelRc: '.babelrc',

    // eslint 配置文件位置
    appEslintRc: '.eslintrc.js',

    // postcss 配置文件位置
    appPostcssRc: 'postcss.config.js',

    // src 目录位置
    appSrc: 'src',

    // pages 目录位置
    appPages: 'src/pages',

    // 服务器端编译入口文件位置
    appServerIndexJs: 'src/server.js',

    // 浏览器端编译入口文件位置
    appClientIndexJs: 'src/client.js',

    // node_modules 目录位置
    appNodeModules: 'node_modules',

    // 浏览器端编译产物输出目录位置
    appClientBuild: 'prd',

    // 服务器端编译产物输出目录位置
    appServerBuild: 'dist',

    // 浏览器端编译输出的版本文件位置
    appStatsJson: 'prd/webpack-stats.json',

    // 本地开发环境 host
    devHost: 'localhost',

    // 本地开发环境端口
    devPort: '3000',

    /* 运行时需要的配置 */
    // 页面切换时是否滚动到顶部
    scrollToTop: false,

    // 访问静态文件的网址，通常会在环境变量 DACE_PUBLIC_PATH 中配置
    publicPath: '/',

    // 默认首页文件名称 `index.jsx`
    index: 'index'
    ```

## modify(config, { target, isDev }, webpack)
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
