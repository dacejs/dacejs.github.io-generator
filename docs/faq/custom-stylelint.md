---
id: custom-stylelint
title: 自定义 stylelint 规则
---

下面的文档将介绍如何在工程中自定义 stylelint 规则。

## 要点
- 需在工程根目录新增 `stylelint.config.js`，在这个文件中配置规则。
- 强烈建议： **先继承 stylelint-config-dace 再修改 rules**
  ```js
  module.exports = {
    extends: 'stylelint-config-dace',
    rules: {
      // ...
    }
  };
  ```
## 相关链接
- [查看所有规则](https://stylelint.io/user-guide/rules/)
