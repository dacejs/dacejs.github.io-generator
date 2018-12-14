# dacejs.github.io-generator

[Dace文档网站(https://dacejs.github.io/)](https://dacejs.github.io/) 生成工具。

## 命令
根目录下的 `website` 是工作目录，下面所有的操作均在 `website` 目录下进行。

### npm start
启动本地调试服务器，在 `http://localhost:3000` 预览网站。

### npm run build
把 `markdown` 编译成 `HTML`，输出目录为 `build` 。

### npm publish-gh-pages
发布网站，即将 `build` 中的文件提交到 `dacejs/dacejs.github.io` 的 `master` 分支。

注意
- 需要指定 github 用户名和分支明
    ```
    GIT_USER=<GIT_USER> \
      CURRENT_BRANCH=master \
      npm run publish-gh-pages
    ```
- `GIT_USER` 对仓库需要有 owner 权限

## 相关链接
- [Publishing your site](https://docusaurus.io/docs/en/publishing#using-github-pages)
