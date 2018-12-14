---
id: fetching-data-for-pages
title: 获取页面数据
---

得益于 Dace 路由API的优点，我们知道了如何创建一个具有简洁 URL 的 Dace 应用程序。

实际上，我们通常需要从远程数据源获取数据。Dace 提供了一个标准 API 用于为页面获取数据。我们使用一个 `async` 静态方法 `getInitialProps` 来达到获取数据的目的。

以此为基础，我们能够给以页面从远程数据源获取数据，然后把数据传给我们的一个页面组件的属性。我们可以编写 `getInitialProps` 函数让他能够同时在客户端和服务器端运行。

在这节课中，我们还是延续上一节课的内容：在首页显示博客文章，点击文章标题，可以博客详情，不同的是，这次的博客列表和博客详情数据都是从服务器上获取的。

现在开始!

## 设置

下载需要的示例程序:

```shell
git clone https://github.com/dacejs/learn-dace-demo.git
cd learn-dace-demo
git checkout 05.clean-urls
```

用下面的命令运行:

```shell
npm install
npm start
```

然后，访问 [http://localhost:3000](http://localhost:3000)

## 获取文章列表

在我们的演示程序中，显示了一个文章列表，和之前文章列表的硬编码方式不同，这次我们从远程服务器获取列表数据。

> 这里我们使用网上一个公共 API 服务 [http://jsonplaceholder.typicode.com/posts](http://jsonplaceholder.typicode.com/posts) 获取文章信息。

首先，我们使用 [axios](https://github.com/axios/axios) 来获取数据。它是一个浏览器 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 的简单实现，并且可以同时工作在客户端和服务器端环境中。

安装 axios：

```
npm i axios
```

> 译注: 这类能够同时在客户端和服务器运行的应用程序，我们称之为`同构应用程序`

然后，用下面的代码，替换 `src/pages/index.jsx` 文件:

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'dace';
import Layout from '../layouts/default';

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

  static async getInitialProps() {
    const res = await axios.get('http://jsonplaceholder.typicode.com/posts');
    const posts = res.data.map(({ id, title }) => ({ id, title }));
    console.log('--posts:', posts);
    return { posts };
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

上面的代码中增加了静态方法 `getInitialProps` ，该方法中的代码既能在服务器端运行，也能在浏览器端运行。

如你所见，现在，我们获取到了文章列表信息，并且作为页面组件的 `props` 传递到页面组件。

## 仅服务器

本来我们预想的，客户端和服务器都能输出同样的信息，但实际上，在这种情况下，输出信息只显示在了服务器端的控制台上。这是因为，我们的页面是在服务器端进行渲染的。我们在服务器上已经获取到了电视节目的数据，没有理由在客户端再获取一次.

下面我们来验证我们的程序是否能够正确运行。

打开服务器和客户端控制台，访问 [http://localhost:3000](http://localhost:3000)

## 实现信息展示页面

现在我们要实现一个 `/post` 页面来展示文章的详细信息。

用下面的代码替换 `pages/post/index.jsx` 的内容：

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../../layouts/default';

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.any
  };

  static defaultProps = {
    post: {}
  }

  static async getInitialProps(ctx) {
    const { id } = ctx.match.params;
    const res = await axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`);
    const post = res.data;
    console.log('--post:', post);
    return { post };
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

## 从客户端获取数据

这里，我们只在客户端的控制台上看到了调试输入。这是因为我们是通过客户端进行导航的。因此从客户端获取数据是更好的方式.

如果你直接访问Post页面(例如: http://localhost:3000/post/1)，你将会看到调试输出显示在了服务器端而非客户端.

## 最后

现在你学到了 Dace 最为关键的特性: `通用数据获取`和`服务器端渲染(SRR)`.

我们了解了 `getInitialProps`，在大多数情况下，就足够了。
