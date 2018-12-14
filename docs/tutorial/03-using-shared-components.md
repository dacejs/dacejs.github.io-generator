---
id: using-shared-components
title: 使用公共组件
---

我们知道 Dace 是和页面相关的。 通过导出一个 React 组件创建一个页面，然后把它放到 `src/pages` 目录中，基于这个文件名，Dace 存在一个固定的URL。

因为导出的页面是 Javascript 模块，我们当然也能够导入其他组件进来。

在这节课中，我们会创建一个公共的页头组件，并在多个页面之间共用。最后我们抽象出一个布局组件，来看看它是如何定义多个页面的外观的。

## 设置

为了演示这节课所讲的知识点，我们需要一个可运行的示例应用程序，通过下面的命令来获取一个现成的应用程序：

```shell
git clone https://github.com/dacejs/learn-dace-demo.git
cd learn-dace-demo
git checkout 02.navigate-between-pages
```

可以通过下面的命令行来运行：

```shell
npm install
npm start
```

访问 [http://localhost:3000](http://localhost:3000)。

## 创建页头组件

现在，让我们来为我们的应用程序创建一个页头组件。 添加下面的代码到 `src/components/Header.js` 模块文件中。

```js
import React from 'react';
import { Link } from 'dace';

export default () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
  </ul>
);
```

该组件包含两个链接到其他页面的连接。

## 使用页头组件

现在，让我们在页面中导入这个刚创建的页头组件。 现在对于 `src/pages/index.jsx`，它的内容看起来像下面这样:

```js
import React from 'react';
import Header from '../components/Header';

export default () => (
  <div>
    <Header />
    <p>Hello Dace</p>
  </div>
);
```

你可以对 `src/pages/about.jsx` 页面做同样的事情。 现在，如果你访问 [http://localhost:3000/](http://localhost:3000)，你会看到新的页头，并且能够在页面之间进行导航。

现在，我们对这个应用程序进行一些小修改。

- 停止应用程序。
- 重命名 `components` 目录为 `comps`。
- 从 `../comps/Header` 导入，而非 `../components/Header`
- 再次启动应用程序

它还能工作么?

## 组件目录

是的，和之前一样，工作正常! 我们不需要把组件放在一个特殊的目录下，组件目录可以是任意名称，唯一特殊的目录就是 `src/pages` 目录，你甚至可以在 `pages` 目录中创建组件目录。 这里，我们没有直接在 `pages` 目录下创建组件目录是因为，我们不需要直接连接到 Header 组件。

> 译注: `pages` 目录就像Web服务器的根目录一样，通过自然的目录 `/URL` 路径，你可以访问到 `pages` 目录下的组件。 就像 Linux 文件系统一样，URL 中的 PATH 和文件系统的路径是一一对应的。

## 布局组件

在我们的应用程序中，我们在多个页面之间公共一个公共的样式。 为此我们可以创建一个公共的布局组件，并且在多个页面使用它。 下面是一个例子，添加下面的代码到 `src/layouts/default/index.js` 模块文件:

```js
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

const Layout = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
};

export default Layout;
```

然后，我们可以像下面一样，在我们的应用程序页面中使用这个布局组件:

`src/pages/index.jsx` 代码如下：

```js
import React from 'react';
import Layout from '../layouts/default';

export default () => (
  <Layout>
    <p>Hello Dace</p>
  </Layout>
);
```

`src/pages/about.jsx` 代码如下：

```js
import React from 'react';
import Layout from '../layouts/default';

export default () => (
  <Layout>
    <p>This is the about page</p>
  </Layout>
);
```

访问 [http://localhost:3000/](http://localhost:3000)，看看有什么效果。

现在我们从布局组件中删除 `{props.chidren}`，看看会发生什么?

## 渲染子组件

如果你删除了 `{props.chidren}`，布局组件 Layout 不再渲染它所包含的内容。

你可以把组件用于设置公共样式，页面布局，以及任何其他你想要的用途。 另外，你也可以从 npm 模块中导入组件并且使用他们。
