---
id: create-dynamic-pages
title: 创建动态页面
---

现在，我们知道了如何使用多个页面创建一个基本的 Dace 应用程序。为了创建页面，我们需要在磁盘上创建实际的文件。

但是，在真实的应用场景下，我们通常需要通过数据创建动态的页面，用动态的方式显示页面内容。在 Dace 中有多种方式来实现这个目的。

首先，我们使用查询串来创建一个动态的页面。我们创建一个简单的博客应用程序。在首页显示一个博客列表。

当你点击博客标题时，可以看到博客的具体内容。

现在，让我们开始创建这个博客程序。

## 设置

为了按照本课程学习，需要有一个示例 Dace 应用程序，为此，你可以下载下面的这个应用程序作为学习案例：

```shell
git clone https://github.com/dacejs/learn-dace-demo.git
cd learn-dace-demo
git checkout 03.using-shared-components
```

可以用下面的命令来运行：

```shell
npm install
npm start
```

现在，访问 [http://localhost:3000/](http://localhost:3000/)。

## 添加博客列表

首先，让我们在首页添加博客标题列表，添加下面的代码到 `src/pages/index.jsx` 模块文件中。

```js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dace';
import Layout from '../layouts/default';

const PostLink = props => (
  <li>
    <Link to={`/post?title=${props.title}`}>{props.title}</Link>
  </li>
);

PostLink.propTypes = {
  title: PropTypes.string.isRequired
};

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink title="Hello Dace" />
      <PostLink title="Learn Dace is awesome" />
      <PostLink title="Deploy apps with Jenkins" />
    </ul>
  </Layout>
);
```

然后，访问 [http://localhost:3000](http://localhost:3000)，你会看到下面的内容：

## 通过查询串传递数据

我们通过查询串参数传递数据，在这个例子中为 `title` 查询串阐述，表示博客的标题，我们下面为博客的标题实现一个自定义的 `PostLink` 组件。

```js
const PostLink = props => (
  <li>
    <Link to={`/post?title=${props.title}`}>{props.title}</Link>
  </li>
);
```

## 创建博客页面

创建博客页面，显示博客内容，为此我们需要从查询串中获取标题。下面创建一个 `src/pages/post.jsx` 文件，并添加如下内容：

```js
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/default';

const Post = (props) => {
  const { query } = props.location;
  return (
    <Layout>
      <h1>{query.title}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  );
};

Post.propTypes = {
  location: PropTypes.object.isRequired
};

export default Post;
```

现在，页面看起来像这样：

- 每个页面获得一个 `location` 属性， 其中包含当前 URL 相关的详细信息
- 这里我们使用 `query` 对象， 它包含查询串参数
- 然后， 我们从 `props.location.query.title` 获取博客的标题

## 最后

现在我们已经学习到了如何使用查询串创建动态页面。但这仅仅只是开始。一个动态页面需要更多的信息来渲染， 我们不太可能通过查询串传递所有的信息。通常的做法是在 URL 中传递记录的 id ，在目标页面通过 id 向服务器请求我们需要的数据，URL 更像这样 [http://localhost:3000/post/100](http://localhost:3000/post/100)。

接下来， 我们将会学到关于这方面的所有信息。
