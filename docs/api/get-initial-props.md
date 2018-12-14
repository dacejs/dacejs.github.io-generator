---
id: get-initial-props
title: getInitialProps 方法
---

当加载页面获取数据的时候，Dace 通过页面组件的 getInitialProps 静态方法来获取数据。此静态方法能够获取所有的数据，并将其解析成一个 JavaScript 对象，然后将其作为属性附加到 props 对象上。

当初始化页面的时候，getInitialProps 只会在服务器端执行，而当通过 Link 组件来将页面导航到另外一个路由的时候，此方法就只会在客户端执行。

注意：getInitialProps *不能* 在子组件上使用，只能应用于当前页面的顶层组件。

>如果你在 getInitialProps 中引入了一些只能在服务器端使用的模块(例如一些 node.js 的核心模块)，请确保通过正确的方式来导入它们，否则的话，那很可能会拖慢应用的速度，或者是在浏览器端执行时找不到这些模块而报错。

## 参数
getInitialProps 接收的上下文对象包含以下属性：

- match：react-router 对 URL 配置的结果对象，详情请查阅 [react-router 官方文档](https://reacttraining.com/react-router/web/api/match)。
- query：URL的 query string 部分，并且其已经被解析成了一个对象，可以获取到 URL 问号后的数据。解析规则请查阅 [qs 官方文档](https://www.npmjs.com/package/qs)
- req：http request 对象，仅服务器端渲染时可用，浏览器端渲染时，值为 `null`。
- res：http response 对象，仅服务器端渲染时可用，浏览器端渲染时，值为 `null`。

注意：使用 `req` 和 `res` 参数时一定要做环境判断，保证只在服务器端渲染时执行相关代码，如

```js
static async getInitialProps(ctx) {
  let cookies;
  const { req } = ctx;
  if (req) {
    { cookies } = req;
  } else {
    cookies = document.cookie;
  }

  //...
}
```

上面的代码根据环境不同使用不同的方法获取 cookie 值：
- 服务器端渲染时，从 req 对象获取 cookie。
- 浏览器端渲染时，从 document 对象中获取 cookie。

## 在无状态组件中使用
也可以为无状态(stateless)组件自定义 getInitialProps 生命周期方法：

```js
import React from 'react';
import axios from 'axios';

const Page = ({ stars }) => (
  <div>
    stars: {stars}
  </div>
);

Page.getInitialProps = () => {
  const res = await axios.get('https://api.github.com/repos/dacejs/dace');
  return { stars: res.data.stargazers_count };
};

export default Page;
```
