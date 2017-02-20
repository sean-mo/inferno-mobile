# 背景

> 本小项目是公司内部项目，用于架构链路告警，在微信浏览器里显示高耗时的链路跟踪树。同时做边移动端和微信端的初步试验型架构。因为涉及项目相关机制，故移除了业务相关代码，只保留试验性的数据结构和一个概要的项目结构进行分享。

# 描述

> 项目采用 `Inferno`，号称史上最快的VDOM、类似React的API和相应的全家桶，性能可以看这里：

[http://infernojs.org/benchmarks/dbmonster-lazy/](http://infernojs.org/benchmarks/dbmonster-lazy/)

# 入门

> 有 2 种安装方式： yarn / npm

- yarn

```
// 安装npm包
yarn
// 运行开发环境
yarn dev
// 打包生产环境
yarn prod
```

- npm

```
// 安装npm包
npm i 
// 运行开发环境
npm run dev
// 生产环境
npm run prod
```

## FAQ
> 可能会遇到nodemon 不存在，可以npm i nodemon -g 安装

# 项目结构


├── core 
│   ├── config.js 
│   ├── env.js
│   ├── helpers
│   ├── polyfills.js
│   ├── run.js
│   ├── utils
│   └── webpack
├── mock
│   └── tracedetail.json
├── nodemon.json
├── package.json
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── pages
│   ├── server
│   ├── standalone
│   ├── stores
│   └── template
└── yarn.lock