---
id: commands
title: 命令行工具
---

`Dace` 提供一组命令行工具，包含：

## dace start
启动开发环境，这个 dace 默认命令，`dace` 等同于 `dace start`。

### 参数
- `-v`, `--verbose`: 显示详细日志信息
- `-V`, `--visualizer`: 启用 webpack-visualizer 打包分析工具

### 示例
- 单独使用
```
dace start --verbose
dace start -v
dace start --verbose --visualizer
dace start -vV
```

- 和 npm script 一起使用
```json
// package.json
{
  "scripts": {
    "start": "dace start"
  }
}
```

```
npm start -- --verbose
npm start -- -v
npm start -- --verbose --visualizer
npm start -- -vV
```

## dace build
打包编译项目。

### 参数
- `-v`, `--verbose`: 显示详细日志信息
- `-V`, `--visualizer`: 启用 webpack-visualizer 打包分析工具

### 参数
无

## 支持的环境变量

环境变量可以通过在执行命令是传入，也可以配置在 profiles 文件中。

```js
{
  // 客户端编译输出的 stats 文件位置
  DACE_STATS_JSON: paths.appStatsJson,

  // 本地开发 web server 主机名
  DACE_HOST: 'localhost',

  // 本地开发 web server 端口
  DACE_PORT: 3000,

  // API 接口地址 BaseURL，建议配置在 profiles 中
  DACE_API_BASE_URL: 'http://localhost:3002',

  // 编译产物对外服务访问使用的 URL
  DACE_PUBLIC_PATH: '/',

  // 编译产物输出目录位置
  DACE_BUILD_PATH: paths.appClientBuild
}
```
