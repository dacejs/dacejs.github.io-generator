---
id: create-clean-urls-pages
title: 创建简洁明了的网页地址
---

在前面的课程中，我们学到了如何使用查询串创建动态页面。以此为基础，我们一篇博客的链接会像这样： [http://localhost:3000/post?title=Hello%20Dace](http://localhost:3000/post?title=Hello%20Dace)

但是这个URL看起来不怎么好看，如果我们想要下面这样的链接，我们应该怎么办呢？

[http://localhost:3000/p/hello-dace](http://localhost:3000/p/hello-dace)

看起来是不是好很多了，是吧?

## 设置

为了按照本课程学习，需要有一个示例 Dace 应用程序，为此，你可以下载下面的这个应用程序作为学习案例:

```shell
git clone https://github.com/dacejs/learn-dace-demo.git
cd learn-dace-demo
git checkout 04.create-dynamic-pages
```

可以用下面的命令来运行:

```shell
npm install
npm start
```

现在，访问 [http://localhost:3000/](http://localhost:3000/).

## 路由匹配

Dace 内部路由是通过 react-router 实现的。现在，我们将使用路由匹配的功能。基本上，它在浏览器地址栏上显示一个不同于实际 URL 的地址.

现在，我们来给我们的博客地址添加一个路由匹配。

`src/pages/index.jsx` 的内容修改为如下:

```js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dace';
import Layout from '../layouts/default';

const PostLink = props => (
  <li>
    <Link to={`/post/${props.id}`}>{props.title}</Link>
  </li>
);

PostLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink id="hello-dace" title="Hello Dace" />
      <PostLink id="learn-dace" title="Learn Dace is awesome" />
      <PostLink id="deploy-dace" title="Deploy apps with Jenkins" />
    </ul>
  </Layout>
);
```

上面的代码为每一个 PostLink 增加了一个 id ，并且修改了链接地址为 `/post/${props.id}` 。

新增目录 `src/pages/post/`，并在该目录下新增路由文件 `router.js`

`src/pages/post/router.js`，内容如下：
```js
module.exports = {
  path: '/post/:id'
};
```

接着，我们还需要修改 `src/pages/post/index.jsx` 的内容如下：

```js
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../layouts/default';

const getPostById = id => ({
  'hello-dace': 'Hello Dace',
  'learn-dace': 'Learn Dace is awesome',
  'deploy-dace': 'Deploy apps with Jenkins'
}[id]);

const Post = (props) => {
  const { params } = props.match;
  const title = getPostById(params.id);
  return (
    <Layout>
      <h1>{title}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  );
};

Post.propTypes = {
  match: PropTypes.object.isRequired
};

export default Post;
```

路由规则 `/post/:id` 匹配到的 id 信息会保存在 `props.match.params` 中。上面代码中的 `getPostById()` 只是我们为了展示 demo 方便而模拟的函数，实际开发中，它应该是一个通过 id 去 API 接口获取整条记录的请求。

现在，转到主页: [http://localhost:3000/](http://localhost:3000/)，然后点击第一个博客标题，你会被导航到博客内容页面.

好了，现在我们完成了整洁 URL 的支持。就像这样，你可以创建更多你想要的路由。

本例中的数据是写死在代码中的，在下一节课程中，我们将学习如何从服务器端获取动态数据。
