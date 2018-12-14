---
id: code-splitting
title: 拆分打包
---

运行 `dace build` 会将工程打包，默认会按照 page 打包。

## 打包规则
- 入口文件是 `bundle.js`。
- 公共文件打到 `vender.js`，vender.js 的打包规则可配置。
- 所有 css 打成一个包 `styles.css` （临时方案）。
- 每个页面打一个包 `${page}.js`。

## 加载规则
- 首次加载会加载 `bundle.js` `vender.js` `${page}.js` 和 `styles.css`。
- 页面切换时会动态加载对应 `${page}.js`。

## 配置vender.js
修改 `dace.config.js` 中 webpack 的 `optimization.splitChunks.cacheGroups` 配置。

```js
module.exports = {
  modify(config) {
    const appConfig = config;

    // test 是正则表达式，字符串中如包含斜杆，需要转义
    appConfig.optimization.splitChunks.vendor.test = /(react|redux|loadable-components|core-js|deep-equal|dace\/dist)/

    return appConfig;
  }
};
```
