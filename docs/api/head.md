---
id: head
title: <Head>
---

`Head` 是 dace 对外暴露、用于将元素追加到 `<head>` 中的组件，它是个 [react-helmet](https://www.npmjs.com/package/react-helmet)组件，详细 API 参考官网文档。

```js
import { Head } from 'dace';

export default () => (
  <div>
    <Head>
      <title>Home</title>
      <style type="text/css">
        {`
          .red {
            color: #f00;
          }
        `}
      </style>
      <script src="//code.jquery.com/jquery-1.11.3.js" />
    </Head>
    <p className="red">Hello world!</p>
  </div>
);
```

当组件卸载的时候，组件内定义的 `<Head>` 将会被清空，所以请确保每个页面都在其各自的 `<Head>` 内声明了其所有需要的内容，而不是假定这些东西已经在其他页面中添加过了。

- 如果在组件内自定义了 `<Head>`，则自定义 `<Head>` 内的元素(例如 `<title>`、`<meta>`等)将会被追加到框架自带的 `<head>` 标签中
- 每个组件自定义的 `<Head>` 内容只会应用在各自的页面上，子组件内定义的 `<Head>` 也会追加到当前页面的 `<head>` 内，如果有重复定义的标签或属性，则子组件覆盖父组件，位于文档更后面的组件覆盖更前面的组件。
