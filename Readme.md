# 背景

> 本小项目是公司内部项目，用于架构链路告警，在微信浏览器里显示高耗时的链路跟踪树。同时做边移动端和微信端的初步试验型架构。因为涉及项目相关机制，故移除了业务相关代码，只保留试验性的数据结构和一个概要的项目结构进行分享。

# 描述

> 项目采用 `Inferno`，号称史上最快的VDOM、类似React的API和相应的全家桶，性能可以看这里：

[https://rawgit.com/infernojs/dbmonster-inferno/master/index.html](https://rawgit.com/infernojs/dbmonster-inferno/master/index.html)

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

- 运行 

` http://localhost:2002/trace.html`

## FAQ
> 可能会遇到nodemon 不存在，可以npm i nodemon -g 安装

# 项目结构

```
├── core 
│   ├── config.js 
│   ├── env.js       （基于API的环境配置）
│   ├── helpers      
│   ├── polyfills.js （相关polyfill）
│   ├── run.js   ( 前端工程化 执行代码 )
│   ├── utils    ( 工具库：hotcss / http / dateTime )
│   └── webpack （ webpack 2 配置相关 )
├── mock
│   └── tracedetail.json
├── nodemon.json
├── package.json
├── src
│   ├── api         （ 请求服务API，也可以改成Service)
│   ├── assets      （ 静态资源，包括LESS常用的模块）
│   ├── components   （基础、业务组件，目前无内容）
│   ├── pages         （ 页面结构，无内容）
│   ├── server         （服务端相关，无内容，后期逐步区分client/server代码）
│   ├── standalone     （ 单独发布的页面，里边有链路跟踪的代码）
│   ├── stores         （数据模型管理，涉及LS、通讯等，无内容）
│   └── template        （HTML Template） 
└── yarn.lock
```