---
id: cdn
title: 将静态文件发布到 CDN
---

当我们的代码需要动静分离时，需要把静态资源发布到 CDN 网络。dace 所做的是把编译结果中静态资源的引用改成 CDN 地址，这部分工作 dace 已经封装好了，只需要传递环境变量 `DACE_PUBLIC_PATH` 给编译命令就可以了，或者在对于 profile 配置文件中增加如下配置：

```
DACE_PUBLIC_PATH=//www.test.com/xxxx
```

## 相关链接
- [环境变量](concepts/profile.md)
