---
id: dance-with-redux
title: 与 Redux 共舞
---

得益于 Dace 路由API的优点，我们知道了如何创建一个具有简洁 URL 的 Dace 应用程序。

实际上，我们通常需要从远程数据源获取数据。Dace 提供了一个标准 API 用于为页面获取数据。我们使用一个 `async` 静态方法 `getInitialProps` 来达到获取数据的目的。

以此为基础，我们能够给以页面从远程数据源获取数据，然后把数据传给我们的一个页面组件的属性。我们可以编写 `getInitialProps` 函数让他能够同时在客户端和服务器端运行。

在这节课中，我们要实现的功能是：在首页获取用户列表，点击用户名，可以查看用户的详细信息。

现在开始!

## 设置

下载需要的示例程序:

```shell
git clone https://github.com/dacejs/learn-dace-demo.git
cd learn-dace-demo
git checkout 06.fetching-data-for-pages
```

用下面的命令运行:

```shell
npm install
npm start
```

然后，访问 [http://localhost:3000](http://localhost:3000)

上一节课，我们学会了从服务器端获取数据并渲染页面，这对于很多简单的应用已经够用了。不过，当应用变得越来越复杂时，数据状态管理也会更复杂，业内已经有很多状态管理工具，其中 redux 是普及最广泛的一种。今天我们就来学习 dace + redux 开发复杂应用。

## 安装 dace-plugin-redux

首先，我们安装 `dace-plugin-redux` 插件，它会包含 redux 相关的依赖以及修改后的 dace 核心代码。

```
npm i dace-plugin-redux
```

## 增加 dace 配置文件

在工程根目录增加 dace 配置文件 `dace.config.js`，内容如下：

```js
const { reduxConfig } = require('dace-plugin-redux');

module.exports = reduxConfig;
```

这个文件的目的是修改 dace 默认 webpack 配置。

OK，前期准备工作就绪，我们开始进入正题——获取文章列表。

## 获取文章列表

在我们的演示程序中，显示了一个博客列表，现在我们用 `dace` + `redux` 改造演示程序。

通常一个 redux 应用会包含：
  - action.js
  - reducer.js

建议为每一个页面建一个目录，这样组织文件结构会很清晰。

新建 `src/pages/index` 目录，并在该目录分别创建 `index.jsx`, `action.js`, `reducer.js`：

`src/pages/index/action.js` 内容如下：

```js
export const FETCH_POSTS = 'fetch_posts';
export const fetchPosts = () => async (dispatch, getState, api) => {
  const { posts } = getState();
  if (!posts) {
    const res = await api.get('http://jsonplaceholder.typicode.com/posts');
    return dispatch({
      type: FETCH_POSTS,
      payload: res
    });
  }
  return null;
};
```

`src/pages/index/reducer.js` 内容如下：

```js
import { FETCH_POSTS } from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      // 只能返回对象，不能返回数组
      return {
        ...state,
        posts: action.payload.data.map(({ id, title }) => ({ id, title }))
      };
    default:
      return state;
  }
};
```

注意到了吗，`action.js` 、`reducer.js` 这 2 个文件就是标准的 redux 用法，没有什么特殊代码。

然后，`src/pages/index/index.jsx` 文件会很一些不同：

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'dace';
import { fetchPosts } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';

@connect(state => state)
export default class Index extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }))
  };

  static defaultProps = {
    posts: []
  }

  static getInitialProps = (ctx) => {
    ctx.store.injectReducer(reducer);
    return ctx.store.dispatch(fetchPosts());
  }

  componentDidMount() {
    this.props.store.injectReducer(reducer);
  }

  render() {
    return (
      <Layout>
        <h1>Post List</h1>
        <ol>
          {
            this.props.posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))
          }
        </ol>
      </Layout>
    );
  }
}
```

上面的代码一切看来都是很熟悉了，`getInitialProps` 包含的代码和之前有些不同：

```js
static getInitialProps = (ctx) => {
  ctx.store.injectReducer(reducer);
  return ctx.store.dispatch(fetchPosts());
}
```

`getInitialProps` 做了 2 件事：
- 在全局 store 中注入了当前页面需要的 reducer。
- 触发 action 方法获取数据。

需要注意的是，当执行服务器端渲染时， `getInitialProps` 修改的是服务器端的 store ，即 reducer 注入到了服务器端的 store ，这就导致了问题——当在同一页面中浏览器端代码触发 action 时，找不到对应的 reducer 来更新 state ，解决的方法是，在浏览器执行的代码(componentDidMount())中再执行一次 injectReducer 方法。

```js
componentDidMount() {
  this.props.store.injectReducer(reducer);
}
```

## 实现文章展示页面

展示页面和列表页面基本上差不多，直接上代码。

`src/pages/post/action.js` 内容如下：

```js
export const FETCH_POST = 'fetch_post';
export const fetchPost = id => async (dispatch, getState, api) => {
  const res = await api.get(`http://jsonplaceholder.typicode.com/posts/${id}`);
  return dispatch({
    type: FETCH_POST,
    payload: res
  });
};
```

`src/pages/post/reducer.js` 内容如下：

```js
import { FETCH_POST } from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST:
      // 只能返回对象，不能返回数组
      return {
        ...state,
        post: action.payload.data
      };
    default:
      return state;
  }
};
```

`src/pages/post/index.jsx` 内容如下：

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';

@connect(state => state)
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object
  };

  static defaultProps = {
    post: {}
  }

  static getInitialProps = (ctx) => {
    ctx.store.injectReducer(reducer);
    return ctx.store.dispatch(fetchPost(ctx.match.params.id));
  }

  componentDidMount() {
    this.props.store.injectReducer(reducer);
  }

  render() {
    const { post } = this.props;
    return (
      <Layout>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </Layout>
    );
  }
}
```
这里使用了 `getInitialProps` 的 `ctx` 参数，[查看 getInitialProps 文档](api/get-initial-props.md)

## 使用装饰器简化编程

上面虽然实现了 redux 对数据的管理，但每个页面组件中需要写两次 injectReducer，另外 componentDidMount() 的代码完全一样，有没有办法让我们的代码变得更优雅呢？ dace-plugin-redux 提供了一个 `@getInitialProps()` 装饰器，用这个装饰器能让代码看起更简洁。

我们用 `@getInitialProps()` 装饰器来修改 `src/pages/index/index.jsx`：

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'dace';
import { getInitialProps } from 'dace-plugin-redux';
import { fetchPosts } from './action';
import reducer from './reducer';
import Layout from '../../layouts/default';

@getInitialProps({
  reducer,
  promise: ({ store }) => store.dispatch(fetchPosts())
})
@connect(state => state)
export default class Index extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }))
  };

  static defaultProps = {
    posts: []
  }

  render() {
    return (
      <Layout>
        <h1>Post List</h1>
        <ol>
          {
            this.props.posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))
          }
        </ol>
      </Layout>
    );
  }
}
```

- 从 dace-plugin-redux 中导出 `getInitialProps`
- 对页面组件使用 `getInitialProps` 装饰器，装饰器接收 2 个参数：
  - reducer: 当前页面使用的 reducer。
  - promise: 当前页面初始化执行的函数，即 `getInitialProps` 静态方法中的代码。
- 将页面组件的 `getInitialProps` 静态方法 和 `componentDidMount` 方法的代码都删除。

## 最后

现在你学到了 Dace + Redux 开发。
