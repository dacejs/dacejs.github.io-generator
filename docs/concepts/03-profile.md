---
id: profile
title: 环境变量
---

dace 使用 [dotenv](https://www.npmjs.com/package/dotenv) 进行配置管理。

在工程根目录下（注意不是 `src` 目录）新建 `profiles` 目录，在 `profiles` 目录下分别为不同环境建立 profile 文件。

## 命名约定
- `profiles` 中所有的环境变量都可以在 node 环境（即 webpack 编译前和编译中）下取到值。
- 以 `DACE_` 开头的环境变量在 webpack 编译输出产物执行时依然能取到值。

## 加载规则
dace 启动时可以加载多个配置文件，当配置项存在冲突时，以先加载的配置为准，命令行中传入的环境变量优先级最高。

## 配置类型

配置文件有三种类型：

1. `.${PROFILE}.env`：PROFILE 是 portal 发布系统配置的，执行编译时会通过 `build.sh` 获取到该参数，并传递到 `npm run build`，用它来控制发布到不同测试环境的配置文件。
1. `.${NODE_ENV}.env`：与 `process.env.NODE_ENV` 环境变量对应的配置文件，它有四种取值[ `local`, `development`, `beta`, `prod` ]。
1. `.common.env`：所有环境通用的配置文件。

>注意 `.${PROFILE}.env` 和 `.${NODE_ENV}.env` 的区别：
- NODE_ENV 是大环境类型，如 本地开发环境、测试环境、线上环境
- PROFILE 是小环境，只是针对测试环境的，比如项目可能会发布到不同的测试环境（betaA、betaB等）测试，betaA 和 betaB 的 NODE_ENV 都是 beta，但 betaA 和 betaB 在环境上还是有些细微的差异，这时，就可以利用 `.${PROFILE}.env` 来区分这些差异。

## 示例
[with-dotenv](https://github.com/dacejs/dace/tree/master/examples/with-dotenv)
