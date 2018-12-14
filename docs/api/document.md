---
id: document
title: document.js
---

自定义服务器端渲染模版，可以通过该模版改写首屏的 DOM 结构。

## 参数
document 能接收 dace 返回的上下文对象，对象中包含以下参数：

- head：[head 组件](api/head.md)，里面包含 title, meta, link, style, script, noscript 等。
- cssTags：webpack 编译输出的 css 标签字符串。
- jsTags：webpack 编译输出的 css 标签字符串。
- markup：服务器端渲染生成的 DOM 字符串。
- state：服务器端渲染生成的 state 经 JSON.stringify() 后的字符串。
- loadableState：loadable-component 输出的 state 字符串。

## 返回值
返回首屏 HTML 字符串。

## 示例

下面的代码会在 `<body>` 后插入一段设置页面字体大小的 js 。

```js
export default ({
  head, cssTags, jsTags, markup, state, loadableState
}) => `<!doctype html>
<html ${head.htmlAttributes.toString()}>
<head>
  <meta charset="utf-8" />
  ${head.title.toString()}
  ${head.meta.toString()}
  ${head.link.toString()}
  ${head.style.toString()}
  ${head.script.toString()}
  ${head.noscript.toString()}
  ${cssTags}
</head>
<body ${head.bodyAttributes.toString()}>
  <script>
  (function(doc, win) {
    var docEl = doc.documentElement;
    docEl.style.fontSize = docEl.clientWidth / 7.5 + 'px';
  })(document, window);
  </script>
  <div id="root">${markup}</div>
  <script>
  window.INITIAL_STATE=${state};
  </script>
  ${loadableState}
  ${jsTags}
</body>
</html>`;
```
