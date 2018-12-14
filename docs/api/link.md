---
id: link
title: <Link>
---

该组件由 [react-router](https://reacttraining.com/react-router/web/api/Link) 提供。

可以通过 <Link> 组件来实现客户端在两个路由间的切换功能，例如下面两个页面：

```js
// src/pages/index.js
import React from 'react';
import { Link } from 'dace';

export default () => <Link to="/about">About</Link>;
```

```js
// src/pages/about.js
import React from 'react';

export default () => <p>Welcome to About!</p>;
```
