---
id: custom-postcss
title: 自定义 postcss 规则
---

下面的文档将介绍如何在工程中自定义 postcss 配置。

## 要点
- 在工程根目录新增 `postcss.config.js`，在 `postcss.config.js` 增加配置即可。
- `postcss.config.js` 中的规则会覆盖 dace 的 postcss.config 默认配置。
  ```js
  module.exports = {
    plugins: [
      require('stylelint')(),
      require('postcss-cssnext')()
    ]
  };
  ```
- 注意 plugins 的执行顺序。
