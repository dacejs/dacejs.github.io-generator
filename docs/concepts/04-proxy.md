---
id: proxy
title: 请求代理
---

使用 `webpack-dev-server` 的 `proxy` 代理请求，下面的 `dace.config.js` 配置会把所有包含 `/api` 的请求转到 `http://localhost:3001`。

```js
module.exports = {
  modify(config) {
    const appConfig = config;

    appConfig.devServer.proxy = {
      '/api': 'http://localhost:3001'
    };
    return appConfig;
  }
};
```

## 相关链接
- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserver-proxy)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
