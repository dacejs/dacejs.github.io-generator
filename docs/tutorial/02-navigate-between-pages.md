---
id: navigate-between-pages
title: 页面之间的导航
---

现在我们知道了如何创建一个 dace 应用程序并且运行它。 我们的示例应用程序只有一个简单的页面，但是如果你愿意的话，可以添加更多的页面。 例如，可以创建一个 `About` 页面，并添加内容到 `src/pages/about.jsx`。

```js
import React from 'react';

export default () => (
  <h1>This is the about page</h1>
);
```

然后，我们可以打开 [http://localhost:3000/about](http://localhost:3000/about) 来访问这个页面。 然后我们使用 HTML 的 `<a>` 标签来链接这些页面，但是它并不会执行客户端导航，它是执行的服务器端导航，这并不是我们想要的。

为了支持客户端导航，我们需要使用 dace 的 Link API，它是通过 `dace/link` 导出的。 下面我们来看看如何使用它。

## 设置

为了按照本课程学习，需要有一个示例 dace 应用程序，为此，你可以下载下面的这个应用程序作为学习案例：

```shell
git clone https://github.com/dacejs/learn-dace-demo.git
cd learn-dace-demo
git checkout 01.getting-started
```

可以用下面的命令来运行:

```shell
npm install
npm start
```

现在，访问 [http://localhost:3000/](http://localhost:3000/)。

## 使用 Link

现在我们将会使用 `dace/link` 来连接我们的页面。 添加如下代码到 `src/page/index.jsx` 模块文件

```js
import React from 'react';
import { Link } from 'dace';

export default () => (
  <div>
    <h1>Hello Dace</h1>
    <Link to="/about">About Page</Link>
  </div>
);
```

在这个例子中，我们从 `dace` 导入了 `Link` 模块，并且像下面这样使用它：

```html
<Link to="/about">About Page</Link>
```

我们再来创建 `src/pages/about.jsx`，内容如下：

```js
import React from 'react';

export default () => (
  <div>
    <p>This is the about page</p>
  </div>
);
```

现在，再次访问 [http://localhost:3000/](http://localhost:3000/)，点击 "About Page" 连接，你将被带到 `About Page` 页面。

![02](/docs/assets/tutorial/02.about.gif)

> 这是客户端导航，行为发生在客户端，没有请求服务器。 你可以打开浏览器开发工具的网络标签，看看有没有网络请求来验证。

下面是一个简单的任务:

- 访问 [http://localhost:3000/](http://localhost:3000/)
- 点击 "About Page"
- 点击浏览器的后退按钮

描述一下，点击后退按钮后你看到了什么? 是的，客户端导航把你带回了 Home 页面。

## 客户端历史支持

当你点击后退按钮的时候，dace 把你带回了 Home 页面，这个过程完全是客户端实现的；`dace/link` 为你处理了所有 `location.history` 相关的事情，你甚至不需要编写任意一行客户端路由代码。

你需要做的只是简单的链接页面而已，就这样!

## 使用按钮进行链接

现在，我们需要一个按钮而不是一个链接，现在我们需要修改我们的导航代码，像这样：

```js
<Link to="/about">
  <button>Go to About Page</button>
</Link>
```

## 更新网页标题

现在我们可以轻松的实现多个页面之间的切换。但在实际开发中，页面切换后我们希望网页标题、网页关键字、甚至网页描述等 meta 信息也跟随页面一起变动。

在 dace 中很容易就能实现这个功能，我们修改 `src/pages/index.jsx` 代码：

```js
import React from 'react';
import { Link, Head } from 'dace';

export default () => (
  <div>
    <Head>
      <title>Hello Dace</title>
    </Head>
    <h1>Hello Dace</h1>
    <Link to="/about">About Page</Link>
  </div>
);
```

代码从 dace 导入了 `Head` 组件，并将它应用于页面。同样的方式修改 `src/pages/about.jsx`：

```js
import React from 'react';
import { Head } from 'dace';

export default () => (
  <div>
    <Head>
      <title>About</title>
    </Head>
    <p>This is the about page</p>
  </div>
);
```

好了，我们再回到浏览器观察效果：当页面切换时，网页标题也跟着变了。

## 链接虽然简单，但是强大

这里，我们只看到了关于 `dace/link` 很基本的例子。 接下来的课程我们会更加深入的了解如何使用 Link 。 如果你想要了解 dace 的路由功能，参考 [ dace 路由文档](/concepts/routing.md) 文档。
